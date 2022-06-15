import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const BottomNav = () => {
  let location = useLocation()

  return (
    <div className='tab-nav-container fixed-bottom d-md-block d-lg-none'>
      <div className='bottom-nav-container container'>
        <NavLink className='tab' to='/'>
          <i className='fa-solid fa-house'></i>
          <p> Home</p>
        </NavLink>
        <NavLink className='tab' to='/transactions'>
          <i className='fa-solid fa-rectangle-list'></i>
          <p> Transactions</p>
        </NavLink>
        <NavLink className='tab' to='/cart'>
          <i className='fa-solid fa-cart-shopping'></i>
          <p> Cart</p>
        </NavLink>
        {/* {location && } */}
        <NavLink className='tab' to='/login'>
          <i className='fa-solid fa-user'></i>
          <p> Profile</p>
        </NavLink>
      </div>
    </div>
  )
}

export default BottomNav
