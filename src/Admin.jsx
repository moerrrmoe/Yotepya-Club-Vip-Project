import React from 'react'
import { useState,useEffect } from 'react'
import AdminCard from './AdminCard'

function Admin() {
    const [data, setdata] = useState()
    const [filteredData,setfilteredData] = useState()
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://paleturquoise-shark-618021.hostingersite.com/data.json');
            const result = await response.json();
            setdata(result);
          } catch (err) {
            console.log(err)
          } finally {
            console.log('success')
          }
        };
    
        fetchData();
      }, []);

    const submitHandler = (prevId,id,exp,index) => {
        const singleUpdated = {id: Number(id), expdate: exp}
        const finalUpdated = data.map(
            (d,i)=> (d.id==prevId ? d = singleUpdated: d)
        )
        setdata(finalUpdated)
        fetch('https://paleturquoise-shark-618021.hostingersite.com/updateJson.php',{
            method : 'Post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(finalUpdated)
        })
    }
    function padDigits (topad,lenght){
        const result = String(topad.toString()).padStart(lenght,'0')
        return result
    }
    const filterHandler = (searchInput) => {
        const filtered = data.filter(d =>
          d.id.toString().includes(searchInput.toString())
        );
        setfilteredData(filtered);
      };
    const newHandler = () => {
        const date = new Date()
        const today = date.getFullYear()+'-'+padDigits(date.getMonth()+2,2)+'-'+padDigits(date.getDate(),2)
        const newUser = {id: null ,expdate: today}
        const tempData = [newUser, ...data];
        setdata(tempData)
        console.log(tempData)
        
    }
if(data){
  return (
    <>
    <div>
        <input type="number" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <input type="submit" value='search' onClick={()=>filterHandler(searchInput)} />
    </div>
    <div id='filtered'>
        <h3>Search Result:</h3>
        {
            filteredData ? 
            filteredData.map(
                (d,i)=>(
                    <AdminCard key={d.id} id={d.id} index={i} exp={d.expdate} submitHandler={submitHandler} />
                )
            ) : "filtered data not found"
        }
        <br />
        <button onClick={()=>setfilteredData(null)}>Clear</button><br />
    </div>
    <div id='all-data'>
        <button onClick={()=>newHandler()}>New User</button><br />
    {
        data.map(
            (d,i)=>(
                <AdminCard key={d.id} id={d.id} index={i} exp={d.expdate} submitHandler={submitHandler} />
            )
        )
    }
    </div>
    
    </>
  )}
}

export default Admin