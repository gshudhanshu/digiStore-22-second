import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import * as Icon from 'react-feather'

import { logout } from '../actions/userActions'

const BottomNav = () => {
  let location = useLocation()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className='tab-nav-container fixed-bottom d-md-block d-lg-none'>
      <div className='bottom-nav-container container'>
        <NavLink className='tab' to='/'>
          <Icon.Home />
          <p> Home</p>
        </NavLink>
        <NavLink className='tab' to='/transactions'>
          <Icon.List />
          <p> Transactions</p>
        </NavLink>
        <NavLink className='tab' to='/cart'>
          <Icon.ShoppingCart />
          <p> Cart</p>
        </NavLink>
        {userInfo ? (
          <NavLink className='tab' to='/profile'>
            <Icon.User />
            <p> Profile</p>
          </NavLink>
        ) : (
          <NavLink className='tab' to='/login'>
            <Icon.User />
            <p> Profile</p>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default BottomNav
