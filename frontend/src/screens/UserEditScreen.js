import React, { useState, useEffect } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {
  const { id: userId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()
  const navigate = useNavigate()

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [full_mobile, setFull_mobile] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.fname || !user.lname || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFname(user.fname)
        setLname(user.lname)
        setFull_mobile(user.full_mobile)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, fname, lname, full_mobile, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
                type='text'
                placeholder='Enter Mobile No'
                value={full_mobile}
                onChange={(e) => setFull_mobile(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
