import React from 'react'
import Card from './Card'
import './styles/row-view.css'

function RowView() {
  const info = [{
    badge: 'popular',
    poster: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'random'
  },
  {
    badge: 'popular',
    poster: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'random'
  },
  {
    badge: 'popular',
    poster: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'random'
  },
  {
    badge: 'popular',
    poster: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'random'
  },
  {
    badge: 'popular',
    poster: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'random'
  },
  ]
  return (
    <>
        <div className='row-container'>
            <div className='title'>
              <h5>Popular Comics</h5>
            </div>
            <div className='cards-container'>
              {info.map(
                (post,index)=>(<Card badge={post.badge} poster={post.poster} title={post.title} />)
              )}
            </div>
        </div>
    </>
  )
}

export default RowView