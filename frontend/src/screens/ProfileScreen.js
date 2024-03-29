import React, { useState, useEffect } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import {
  InputGroup,
  Form,
  Button,
  Row,
  Col,
  Table,
  Container,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { logout } from '../actions/userActions'

import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()
  const navigate = useNavigate()

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [full_mobile, setFull_mobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.fname || !user.lname || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setFname(user.fname)
        setLname(user.lname)
        setFull_mobile(user.full_mobile)
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else if (password.length < 6) {
      setMessage('Password length should be atleast 6 character')
    } else {
      dispatch(
        updateUserProfile({ id: user._id, fname, lname, full_mobile, password })
      )
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        Profile
      </BreadcrumbsItem>
      <Breadcrumb />

      <FormContainer>
        {/* <Row> */}
        <Col className='mx-auto'>
          <h2 className='text-center'>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='fname' className='mb-2'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='fname'
                placeholder='Enter First Name'
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='lname' className='mb-2'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='lname'
                placeholder='Enter Last Name'
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='full_mobile' className='mb-2'>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Mobile Number'
                value={full_mobile}
                onChange={(e) => setFull_mobile(e.target.value)}
                required
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
                <i
                  onClick={(e) => setShowPassword(!showPassword)}
                  className={
                    showPassword
                      ? 'fas fa-eye-slash passwod-icon'
                      : 'fas fa-eye passwod-icon'
                  }
                ></i>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></Form.Control>
                <i
                  onClick={(e) => setShowConfirmPassword(!showConfirmPassword)}
                  className={
                    showConfirmPassword
                      ? 'fas fa-eye-slash passwod-icon'
                      : 'fas fa-eye passwod-icon'
                  }
                ></i>
              </InputGroup>
            </Form.Group>

            <Button
              type='submit'
              className='digicel-button mt-3'
              variant='primary'
            >
              Update
            </Button>
            <Button
              className='digicel-button profile-logout-button mt-3'
              variant='secondary'
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </Form>
        </Col>
        {/* <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col> 
    </Row>*/}
      </FormContainer>
    </>
  )
}

export default ProfileScreen
