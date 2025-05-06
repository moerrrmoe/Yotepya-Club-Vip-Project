import React from 'react'
import './styles/expand-view.css'
import Card from './Card'
import { useDataContext } from './Context';
import { Link } from 'react-router-dom';

function ExpandView() {
    const {data1, loading1, error1 } = useDataContext();

  return (
    <>
        <div className='expand-container'>
            <div className='title'><h4>Latest Comics</h4></div>
            <div className='cards-container-expand'>
                {data1.feed.map(
                    (post,index)=>(<Link to={`/post/${index}`}><Card badge={post.label} poster={post.poster} title={post.title} /></Link>)
                )}
            </div>
        </div>
    </>
  )
}

export default ExpandView