import React, { useState, useEffect } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'

import { InputGroup, Form, Button, Row, Col } from 'react-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()
  const navigate = useNavigate()
  const [full_mobile, setFull_mobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    let mobile = full_mobile
    dispatch(login(mobile, full_mobile, password))
  }

  return (
    <>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        Login
      </BreadcrumbsItem>
      <Breadcrumb />

      <FormContainer>
        {/* <div className='login-form'> */}
        <h1 className='text-center'>Welcome back!</h1>
        <h5 className='text-center mb-30'>
          Please enter your account details here
        </h5>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <div className='login-register-form'>
          <Form onSubmit={submitHandler}>
            {/* <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group> */}
            {/* <Form.Group controlId='phone' className='mb-4'>
                <Form.Label>Mobile Number</Form.Label>
                <PhoneInput
                  country={'bb'}
                  onlyCountries={['bb', 'in']}
                  placeholder='+1246 530 3444'
                  name='mobile-number'
                  id='mobile-number-field'
                  value={full_mobile}
                  onChange={(e) => setFull_mobile(e.target.value)}
                  // onChange={(e) => setFull_mobile(e.target.value)}
                />
              </Form.Group> */}
            <Form.Group controlId='full_mobile' className='mb-2'>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type='full_mobile'
                placeholder='Enter Mobile'
                value={full_mobile}
                onChange={(e) => setFull_mobile(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='mb-2'>
              <Form.Label>Password</Form.Label>
              <InputGroup className='mb-2'>
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

            <div className='button-box'>
              <div className='login-toggle-btn mb-3'>
                <span>
                  {/* <input type='checkbox' /> */}
                  {/* <label className='ml-10 mb-10'>Remember me</label> */}
                  <a href='/forget-password'>Forgot Password?</a>
                </span>
              </div>
              <Button type='submit' className='digicel-button mb-3'>
                Login
              </Button>
            </div>
          </Form>
        </div>
        <Row className=''>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              {' '}
              Register
            </Link>
          </Col>
        </Row>
        {/* </div> */}
      </FormContainer>
    </>
  )
}

export default LoginScreen
