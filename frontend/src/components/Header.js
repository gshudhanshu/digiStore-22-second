import React, { useState } from 'react'

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

import SearchBox from '../components/SearchBox'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'

const Header = ({}) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
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
                {/* <SearchBox /> */}
                <Nav className='mx-auto'>
                  <LinkContainer to='/'>
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/transactions'>
                    <Nav.Link>Transactions</Nav.Link>
                  </LinkContainer>
                  <a
                    href='https://www.digicelgroup.com/bb/en/contact-us.html'
                    className='nav-link'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Contact
                  </a>

                  <LinkContainer to='/cart'>
                    <Nav.Link>
                      <i className='fas fa-shopping-cart'></i>Cart
                    </Nav.Link>
                  </LinkContainer>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to='/login'>
                      <Nav.Link>
                        <i className='fas fa-user'></i>Sign In
                      </Nav.Link>
                    </LinkContainer>
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
            <div className='customer-points'>
              <img
                className='price-dollas-icon'
                src={'/assets/img/digi_dollar.png'}
                alt='Digi dollas'
              />
              <div className=''>{100}</div>
              <span className='d-none d-md-block'>Digi Dollas</span>
            </div>
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
