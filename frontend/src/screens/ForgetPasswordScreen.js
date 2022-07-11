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

// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import intlTelInput from 'intl-tel-input'
// import 'intl-tel-input/build/css/intlTelInput.css'

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register, sendOtp, forget } from '../actions/userActions'

function ForgetPasswordScreen() {
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
    let use = 'forget'
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(
        forget({
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
    console.log('test')
    setOtpTimeLeft(60)
    let use = 'forget'
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
        Forget Password
      </BreadcrumbsItem>
      <Breadcrumb />

      <FormContainer>
        <h1 className='text-center'>Forget Password</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form className='registration-form' onSubmit={submitHandler}>
          {/* <Form.Group controlId='full_mobile'> */}
          {/* <label className='form-label' htmlFor='full_mobile'>
              Mobile Number
            </label>
            <Form.Control
              type='full_mobile'
              placeholder='Enter Mobile No'
              value={full_mobile}
              onChange={(e) => setFull_mobile(e.target.value)}
            ></Form.Control>
            <Button onClick={sendOtpHandler}>Send Code</Button> */}
          {/* <Row>
            <PhoneInput
              country={'bb'}
              onlyCountries={['bb', 'in']}
              value={full_mobile}
              onChange={(full_mobile) => setFull_mobile(full_mobile)}
              autoFormat={false}
              inputProps={{
                name: 'full_mobile',
                id: 'full_mobile',
                required: true,
                autoFocus: true,
              }}
            />
            <Button onClick={sendOtpHandler}>Send Code</Button>
          </Row> */}
          {/* <IntlTelInput
            containerClassName='intl-tel-input w-100'
            inputClassName='form-control'
            preferredCountries={[]}
            onlyCountries={['bb', 'in']}
            defaultCountry='bb'
            type='full_mobile'
            placeholder='Enter Mobile No'
            // value
            // onPhoneNumberChange={onChange(e) => setFull_mobile(e.target.value)}
            onPhoneNumberBlur={() => {
              let telVal = document.querySelector('#full_mobile').value
              setFull_mobile(telVal)
              console.log(telVal)
            }}
            fieldId='full_mobile'
          /> */}
          {/* </Form.Group> */}

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
              <div className='input-group-append mb-2'>
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
            className='digicel-button mt-3'
            type='submit'
            variant='primary'
          >
            Submit
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

export default ForgetPasswordScreen
