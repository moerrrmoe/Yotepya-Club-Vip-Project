import React, { useState,useRef } from 'react';
import useLocalStorage from './useLocalstorage';
import useFetchFeeds from './Merger';  // Import the custom hook
import './styles/post.css';
import { Link,useNavigate } from 'react-router-dom';

function Chlist({ chapi }) {
  const [currentList, setcurrentList] = useLocalStorage('list', '');
  const [currentCh, setcurrentCh] = useLocalStorage('ch', '');
  const normalList = useRef(null);
  const reverseList = useRef(null);
  const navigate = useNavigate()

  // Use the custom hook to fetch and merge entries
  const {entries, loading, error} = useFetchFeeds(chapi);

  function handleChclick ( index) {
    setcurrentList(chapi);
    setcurrentCh(index);
    console.log(currentList);
    console.log(entries);
    navigate('/chview')
  };

  // Function to render the fetched entries
  const renderEntries = () => {
    return entries.map((entry, index) => (
      <div className='listItem' onClick={()=>handleChclick(index)} key={index}>
        <h3>{entry.link[4].title}</h3>
      </div>
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <h2>Entries List</h2>
    <div className='listContainer'>
      
      {renderEntries()}
    </div>
    </>
  );
}

export default Chlist;
