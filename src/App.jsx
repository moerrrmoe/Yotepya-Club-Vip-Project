import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './header';
import Home from './home';
import { DataProvider } from './Context';
import Post from './Post';
import Chview from './Chview';
import useFetchData from './useFetchData';
import NavBar from './Navbar';
import Footer from './Footer';
import Admin from './Admin';

function App() {
  const [isValid, setIsValid] = useState(false);
  const [userId, setUserId] = useState(null);
  const [singleData, setSingleData] = useState(null);
  const [isUserValid, setIsUserValid] = useState(false);

  // Fetch user data from the server
  const { data: userdata, loading: uloading, error: uerror } = useFetchData(
    'https://paleturquoise-shark-618021.hostingersite.com/data.json'
  );

  // Helper to pad digits for date formatting
  function padDigits(num, length) {
    return String(num).padStart(length, '0');
  }

  // Set Telegram user ID (fallback to static ID if not available)
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const telegramUserId = window.Telegram.WebApp.initDataUnsafe.user.id;
      setUserId(telegramUserId);
    } else {
      setUserId(7302143961); // fallback for testing
      console.log('Telegram is not available');
    }
  }, []);

  // Check if the user ID exists in the fetched data
  useEffect(() => {
    if (userdata && userId) {
      const isValidUser = userdata.some(user => user.id === userId);
      setIsUserValid(isValidUser);
    }
  }, [userdata, userId]);

  // Filter and set the single user data
  useEffect(() => {
    if (isUserValid && userdata) {
      const matched = userdata.filter(user => user.id === userId);
      setSingleData(matched);
    }
  }, [isUserValid, userdata, userId]);

  // Check if user's expdate is valid (i.e., in the future)
  useEffect(() => {
    if (singleData && singleData.length > 0) {
      const singleExp = singleData[0].expdate;
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      setIsValid(singleExp > today);
    }
  }, [singleData]);

  // Show fallback message if user is invalid or expired
  if (!isValid) {
    return (
      <>
        <h2>Error: Membership plan wasn't found</h2>
        <p>မိတ်ဆွေ၏ telegram acc သည် premium planဝယ်ယူထားခြင်မရှိသိုမဟုတ် သက်တမ်းကုန်ဆုံးနေပါသည်

Admin နှင့် ဆက်သွယ်၍ သက်တမ်းတိုးခြင်းပြုလုပ်ပါ</p>
      <button onClick={()=>window.open('https://t.me/OniTommy')} className='contact-btn'><i class="fab fa-telegram-plane"></i>Contact to admin</button>
      </>
    );
  }

  // Main app content if user is valid
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/home" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/chview" element={<Chview />} />
            <Route path="/admin" element={<Admin />} />
            
          </Routes>
          <Footer />
          <NavBar />
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
