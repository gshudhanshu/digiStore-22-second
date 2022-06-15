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
    <header className='header-area clearfix container'>
      <Navbar
        className='sticky-bar header-res-padding clearfix '
        // fixed='top'
        // className='py-4 stick'
        bg='white'
        variant='light'
        expand='lg'
        collapseOnSelect
      >
        <Container fluid>
          <LinkContainer to='/' className='col-xl-2 col-lg-2 col-md-6 col-4'>
            <Link to='/'>
              <img alt='' className='logo' src={'/assets/img/logo.png'} />
            </Link>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <SearchBox /> */}
            <Nav className='ms-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/transactions'>
                <Nav.Link>Transactions</Nav.Link>
              </LinkContainer>
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
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
