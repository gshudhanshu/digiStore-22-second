import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Offcanvas,
  Container,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import * as Icon from 'react-feather'

import SearchBox from '../components/SearchBox'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { getUserProfile } from '../actions/userActions'

const Header = ({}) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile(userInfo._id))
    }
  }, [])

  const logoutHandler = () => {
    dispatch(logout())
  }

  // OffCanvas nav
  // const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  return (
    <>
      <header>
        <Navbar
          // bg='white'
          variant='light'
          expand='lg'
          collapseOnSelect
          // className='stick sticky-bar header-res-padding clearfix'
        >
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <img alt='' className='logo' src={'/assets/img/logo.png'} />
              </Navbar.Brand>
            </LinkContainer>
            {/* <Button
              variant='primary'
              className='d-none d-sm-block d-md-none'
              onClick={handleShow}
            >
              Launch
            </Button> */}

            {/* <Navbar.Toggle
              aria-controls='basic-navbar-nav'
              className='d-none d-md-block'
            /> */}
            <div className='d-none d-md-block'>
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mx-auto'>
                  <NavLink to='/' end>
                    Home
                  </NavLink>
                  <NavLink to='/transactions'>Transactions</NavLink>
                  <a
                    href='https://www.digicelgroup.com/bb/en/contact-us.html'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Contact
                  </a>

                  <NavLink to='/cart' end>
                    <Icon.ShoppingCart />
                    Cart
                  </NavLink>
                  {userInfo ? (
                    <NavDropdown title={userInfo.fname} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavLink to='/login' end>
                      <Icon.User />
                      Login
                    </NavLink>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </div>
            {userInfo && (
              <div className='customer-points'>
                <img
                  className='price-dollas-icon'
                  src={'/assets/img/digi_dollar.png'}
                  alt='Digi dollas'
                />
                <div className=''>{userInfo.digiDollas}</div>
                <span className='d-none d-md-block'>Digi Dollas</span>
              </div>
            )}
          </Container>
        </Navbar>
      </header>
      {/* <Offcanvas placement={'end'} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas> */}
    </>
  )
}

export default Header
