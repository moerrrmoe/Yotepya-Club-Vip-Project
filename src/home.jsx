import React from 'react'
import RowView from './rowView'
import ExpandView from './expandView'
import useFetchData from './useFetchData';
import { useDataContext } from './Context';

function Home() {
  const {data1, loading1, error1 } = useDataContext();

  if (loading1) return <div>Loading...</div>;
  if (error1) return <div>Error: {error1.message}</div>;

  if(data1){
  return (
    <>
      <div class="marquee">
            <p> အပိုင်းမပေါ်ခြင်းများဖြစ်ပါက VPN ကျော်၍ကြည့်ပါ</p>
        </div>
      <ExpandView />
    </>
  )
}}

export default Home