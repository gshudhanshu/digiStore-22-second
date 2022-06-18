import React, { useState, useEffect, useRef } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Form, Button, Row, Col } from 'react-bootstrap'

import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'

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

  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

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
    let use = 'register'
    let fname = document.querySelector('#fname').value
    let lname = document.querySelector('#lname').value
    // let mobile = document.querySelector('#mobile').value
    let full_mobile = document.querySelector('#full_mobile').value
    dispatch(sendOtp(fname, lname, mobile, full_mobile, use))
  }

  const input = document.querySelector('#mobile')
  intlTelInput(input, {
    // console.log("test")
  })

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form className='registration-form' onSubmit={submitHandler}>
          <Form.Group controlId='fname'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='fname'
              placeholder='Enter First Name'
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='lname'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='lname'
              placeholder='Enter Last Name'
              value={lname}
              onChange={(e) => {
                setLname(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='full_mobile'>
            <label className='form-label' htmlFor='full_mobile'>
              Mobile Number
            </label>
            <Form.Control
              type='full_mobile'
              placeholder='Enter Mobile No'
              value={full_mobile}
              onChange={(e) => setFull_mobile(e.target.value)}
            ></Form.Control>
            <Button onClick={sendOtpHandler}>Send Code</Button>
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
          </Form.Group>

          <div className='mb-3'>
            <label htmlFor='mobile' className='form-label'>
              Mobile
            </label>
            <div className='input-group'>
              <input
                type='tel'
                className='form-control'
                id='mobile'
                name='mobile'
                placeholder='Enter Mobile No'
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              />
              <div className='input-group-append'>
                <button
                  className='btn btn-outline-secondary'
                  type='button'
                  id='otpBtn'
                >
                  Send Code
                </button>
              </div>
            </div>

            <div className='form-text'>
              <span id='valid-mob-msg' className='d-none'>
                <i className='fa-solid fa-square-check'></i> Valid number
              </span>
              <span id='error-mob-msg' className='d-none'></span>
            </div>
            <div id='mobileHelp' className='form-text'>
              Format: +12461234567
            </div>
          </div>

          <Form.Group controlId='otp'>
            <Form.Label>SMS Code</Form.Label>
            <Form.Control
              type='otp'
              placeholder='SMS Code'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>confirmPassword</Form.Label>
            <Form.Control
              type='confirmPassword'
              placeholder='Enter confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
            Login
          </Link>
        </Row>
      </FormContainer>
    </>
  )
}

export default RegisterScreen
