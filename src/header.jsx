import React from 'react'
import './styles/header.css'

function Header() {
  return (
    <div className='header-container'>
        <div className='logo-container'>
            <img src="#" alt="ypc-logo" />
        </div>
        <div className='menu-container'>
            <div className='menu-child'>Home</div>
            <div className='menu-child'>Categories</div>
            <div className='menu-child'>Bookmarks</div>
        </div>
    </div>
  )
}

export default Header