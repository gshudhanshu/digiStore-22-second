import React, { useState, useEffect } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen() {
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
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(register(fname, lname, full_mobile, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
            onChange={(e) => setLname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='full_mobile'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type='full_mobile'
            placeholder='Enter Mobile No'
            value={full_mobile}
            onChange={(e) => setFull_mobile(e.target.value)}
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
  )
}

export default RegisterScreen
