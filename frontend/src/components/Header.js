import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
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

  return (
    <>
      <header className='header-area clearfix container'>
        <Navbar
          className='stick sticky-bar header-res-padding clearfix '
          fixed='top'
          // className='py-4 stick'
          bg='white'
          variant='light'
          expand='lg'
          collapseOnSelect
        >
          <Container>
            <LinkContainer to='/' className=''>
              <Link to='/'>
                <img alt='' className='logo' src={'/assets/img/logo.png'} />
              </Link>
            </LinkContainer>

            {/* <SearchBox /> */}
            <Nav className='ms-auto main-menu' fluid>
              <ul className='navbar-nav'>
                <li>
                  <LinkContainer to='/'>
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                </li>
                <li>
                  <LinkContainer to='/transactions'>
                    <Nav.Link>Transactions</Nav.Link>
                  </LinkContainer>
                </li>
                <li>
                  <a
                    href='https://www.digicelgroup.com/bb/en/contact-us.html'
                    className='nav-link'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <LinkContainer to='/cart'>
                    <Nav.Link>
                      <i className='fas fa-shopping-cart'></i>Cart
                    </Nav.Link>
                  </LinkContainer>
                </li>
                <li>
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
                    <>
                      <LinkContainer to='/login'>
                        <Nav.Link>
                          <i className='fas fa-user'></i> Login
                        </Nav.Link>
                      </LinkContainer>
                      {/* <LinkContainer to='/register'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Register
                    </Nav.Link>
                  </LinkContainer> */}
                    </>
                  )}
                </li>
                <li>
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
                </li>
              </ul>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <nav
        id='mainNav'
        class='navbar navbar-light navbar-expand-md fixed-top navbar-shrink py-3'
      >
        <div class='container'>
          <a class='navbar-brand d-flex align-items-center' href='/'>
            <span class='bs-icon-sm bs-icon-circle bs-icon-primary shadow d-flex justify-content-center align-items-center me-2 bs-icon'></span>
            <span>Brand</span>
          </a>
          <button
            class='navbar-toggler'
            data-bs-toggle='collapse'
            data-bs-target='#navcol-1'
          >
            <span class='visually-hidden'>Toggle navigation</span>
            <span class='navbar-toggler-icon'></span>
          </button>
          <div id='navcol-1' class='collapse navbar-collapse'>
            <ul class='navbar-nav mx-auto'>
              <li class='nav-item'>
                <a class='nav-link active' href='index.html'>
                  Home
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='services.html'>
                  Services
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='projects.html'>
                  Projects
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='pricing.html'>
                  Pricing
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='contacts.html'>
                  Contacts
                </a>
              </li>
            </ul>
            <a class='btn btn-primary shadow' role='button' href='signup.html'>
              Sign up
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
