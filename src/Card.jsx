import React from 'react'
import './styles/card.css'

function Card({badge,poster,title}) {
  return (
    <>
        <div className='card-container'>
            <div className='upper-info'>
                <div className='badge'>
                    {badge}
                </div>
            </div>
            <div className='poster-container'>
                <img src={poster} alt="poster" className='poster' />
            </div>
            <div className='lower-info'>
                <h5>{title}</h5>
            </div>
        </div>
    </>
  )
}

export default Card