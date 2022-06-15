import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const BottomNav = () => {
  return (
    <div className='tab-nav-container fixed-bottom d-md-block d-lg-none'>
      <div className='bottom-nav-container container'>
        <NavLink className='tab' to='/'>
          {/* <div className='tab active purple'> */}
          <i className='fa-solid fa-house'></i>
          <p> Home</p>
          {/* </div> */}
        </NavLink>
        <NavLink className='tab' to='/transactions'>
          {/* <div className='tab pink'> */}
          <i className='fa-solid fa-rectangle-list'></i>
          <p> Transactions</p>
          {/* </div> */}
        </NavLink>
        <NavLink className='tab' to='/cart'>
          {/* <div className='tab'> */}
          <i className='fa-solid fa-cart-shopping'></i>
          <p> Cart</p>
          {/* </div> */}
        </NavLink>
        <NavLink className='tab' to='/login'>
          {/* <div className='tab'> */}
          <i className='fa-solid fa-user'></i>
          <p> Profile</p>
          {/* </div> */}
        </NavLink>
      </div>
    </div>
  )
}

export default BottomNav
