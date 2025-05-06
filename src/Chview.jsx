import { useState } from "react";
import useLocalStorage from "./useLocalstorage";
import useFetchFeeds from "./Merger";
import React from 'react';
import './styles/chview.css'

function Chview() {
    const [currentList, setCurrentList] = useLocalStorage('list', '');
    const [currentCh, setCurrentCh] = useLocalStorage('ch', 0); // Start with index 0, instead of ''
    const {entries, loading, error} = useFetchFeeds(currentList);

    const handleNext = () => {
        if (currentCh > 0) {
            setCurrentCh(Number(currentCh - 1));
        } else {
            alert('You are at the last chapter'); // Or you can use an alert if you prefer
        }
    }

    const handlePrev = () => {
        if (currentCh < entries.length - 1) {
            setCurrentCh(Number(currentCh + 1));
        } else {
            alert('You are at the first chapter'); // Or you can use an alert if you prefer
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: အပိုင်းများမပေါ်ပါက VPN ချိတ်ဆက်ရန်လိုအပ်နေခြင်ဖြစ်သည်</div>;

    if(entries){
    return (
        <>
            <div className="titleContainer"><p>{entries[currentCh]? entries[currentCh].link[4].title : 'error'}</p></div>
            <iframe width='100%' src={entries[currentCh]? entries[currentCh].link[4].href+'?hideall=1' : '#'} frameborder="0"></iframe>
            <div>
                <button className="prevBtn" onClick={()=>handlePrev()}>Prev</button>
                <button className="nextBtn" onClick={()=>handleNext()}>Next</button>
            </div>
            
        </>
    );
}}

export default Chview;
