import React, { useState, useEffect, useMemo } from 'react';
import { useDataContext } from './Context';
import { useParams } from 'react-router-dom';
import './styles/post.css';
import Chlist from './Chlist';

function Post() {
  const { data1, loading1, error1 } = useDataContext();

  // Retrieve the post ID from the URL params
  let { id } = useParams();
  id = Number(id); // Ensure it's a number

  console.log('rendered');

  // If data is still loading or there is an error, render corresponding messages
  if (loading1) return <div>Loading...</div>;
  if (error1) return <div>Error: အပိုင်းများမပေါ်ပါက VPN ချိတ်ဆက်ရန်လိုအပ်နေခြင်ဖြစ်သည်</div>;

  const post = data1?.feed?.[id];

  // Guard against invalid IDs or missing data
  if (!post) {
    return <div>Post not found.</div>;
  }

  // Memoize the chapter list to avoid unnecessary re-renders
  // Only recompute the chapter list if `id` or `post.chapter` changes
  const chapterList = useMemo(() => <Chlist id={id} chapi={post.chapter} />, []);

  return (
    <div className='post-container'>
      <div className='poster-container'>
        <img id='post-image' src={post.poster} alt="poster" />
        <h3>{post.title}</h3>
      </div>
      <div className='review-container'>
        <h5>Review</h5>
        <p>{post.review}</p>
      </div>
      <div className='ch-list'>
        {chapterList} {/* Render the memoized chapter list */}
      </div>
    </div>
  );
}

export default Post;
