import React, { useState, useEffect, useRef } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { InputGroup, Form, Button, Row, Col } from 'react-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import intlTelInput from 'intl-tel-input'
// import 'intl-tel-input/build/css/intlTelInput.css'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register, sendOtp } from '../actions/userActions'

function RegisterScreen() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()
  const navigate = useNavigate()

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [full_mobile, setFull_mobile] = useState('')
  const [mobile, setMobile] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const input = useRef(null)

  const [otp, setOtp] = useState('')
  const [otpTimeLeft, setOtpTimeLeft] = useState(0)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  let initialized = false
  let mobile_intTel
  useEffect(() => {
    // if (!initialized) {
    //   var input = document.querySelector('#mobile')
    //   //Selecting country flag using ip address
    //   mobile_intTel = window.intlTelInput(mobile, {
    //     // onlyCountries: ['bb'],
    //     initialCountry: 'bb',
    //     placeholderNumberType: 'MOBILE',
    //     hiddenInput: 'full_mobile',
    //     onlyCountries: ['bb', 'in'],
    //     // geoIpLookup: function (callback) {
    //     //   $.get('https://ipinfo.io', function () {}, 'jsonp').always(function (
    //     //     resp
    //     //   ) {
    //     //     var countryCode = resp && resp.country ? resp.country : 'us'
    //     //     callback(countryCode)
    //     //   })
    //     // },

    //     utilsScript: 'assets/js/utils.js', // just for formatting/placeholders etc
    //   })
    // }
    otpTimeLeft > 0 && setTimeout(() => setOtpTimeLeft(otpTimeLeft - 1), 1000)

    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect, otpTimeLeft])

  const submitHandler = (e) => {
    let use = 'register'
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(
        register({
          fname,
          lname,
          mobile,
          full_mobile,
          otp,
          password,
          confirmPassword,
          use,
        })
      )
    }
  }

  const sendOtpHandler = () => {
    setOtpTimeLeft(60)
    let use = 'register'
    let fname = document.querySelector('#fname').value
    let lname = document.querySelector('#lname').value
    let mobile = document.querySelector('#mobile').value
    // let full_mobile = document.querySelector('[name="full_mobile"]').value
    // let full_mobile = mobile_intTel.getNumber(
    //   intlTelInputUtils.numberFormat.E164
    // )
    dispatch(sendOtp(fname, lname, mobile, full_mobile, use))
  }

  return (
    <>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        Register
      </BreadcrumbsItem>
      <Breadcrumb />

      <FormContainer>
        <h1 className='text-center'>Create New Account</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form className='registration-form' onSubmit={submitHandler}>
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
              onChange={(e) => {
                setLname(e.target.value)
              }}
              required
            ></Form.Control>
          </Form.Group>

          <div className='mb-2'>
            <label htmlFor='mobile' className='form-label'>
              Mobile
            </label>
            <div className='input-group'>
              <input
                ref={input}
                type='tel'
                className='form-control'
                id='mobile'
                name='mobile'
                placeholder='Enter Mobile No'
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
                required
              />
              <div className='input-group-append'>
                <Button
                  className='btn btn-outline-secondary digicel-button'
                  type='button'
                  id='otpBtn'
                  onClick={sendOtpHandler}
                  disabled={otpTimeLeft > 0 ? true : false}
                >
                  {otpTimeLeft > 0 ? otpTimeLeft : 'Send Code'}
                </Button>
              </div>
            </div>

            <div className='form-text'>
              <span id='valid-mob-msg' className='d-none'>
                <i className='fa-solid fa-square-check'></i> Valid number
              </span>
              <span id='error-mob-msg' className='d-none'></span>
            </div>
            <div id='mobileHelp' className='form-text'>
              Format: 1234567
            </div>
          </div>

          <Form.Group controlId='otp' className='mb-2'>
            <Form.Label>SMS Code</Form.Label>
            <Form.Control
              type='otp'
              placeholder='SMS Code'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
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
            Register
          </Button>
        </Form>
        <div className='py-3'>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
            Login
          </Link>
        </div>
      </FormContainer>
    </>
  )
}

export default RegisterScreen
