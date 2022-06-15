import React from 'react'
import { Container } from 'react-bootstrap'

const BottomNav = () => {
  return (
    <div class='tab-nav-container fixed-bottom d-md-block d-lg-none'>
      <Container className='bottom-nav-container'>
        <div class='tab active purple'>
          <i class='fas fa-home'></i>
          <p>Home</p>
        </div>
        <div class='tab pink'>
          <i class='far fa-heart'></i>
          <p>Likes</p>
        </div>
        <div class='tab yellow'>
          <i class='fas fa-search'></i>
          <p>search</p>
        </div>
        <div class='tab teal'>
          <i class='far fa-bell'></i>
          <p>Notifications</p>
        </div>
      </Container>
    </div>
  )
}

export default BottomNav
