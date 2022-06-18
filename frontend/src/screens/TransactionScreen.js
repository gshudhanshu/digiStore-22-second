import React, { useState, useEffect } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import {
  Container,
  Badge,
  Image,
  Button,
  Row,
  Col,
  Table,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

import { listMyOrders } from '../actions/orderActions'
import { listMyCards } from '../actions/cardActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function TransactionScreen() {
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

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const cardListMy = useSelector((state) => state.cardListMy)
  const { loading: loadingCards, error: errorCards, cards } = cardListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.fname || !user.lname || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
        dispatch(listMyCards())
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
    } else {
      dispatch(
        updateUserProfile({ id: user._id, fname, lname, full_mobile, password })
      )
    }
  }
  return (
    <>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        Transactions
      </BreadcrumbsItem>
      <Breadcrumb />
      <Container>
        {(loadingOrders && loadingCards) ? (
          <Loader />
        ) : (
          orders.map((order) => (
            <Row className='order-container' key={order._id}>
              <Col className='orderId' xs={6}>
                Order ID: {order.orderId}
              </Col>
              <Col xs={6} className='align-self-end'>
                Date: {order.createdAt.substring(0, 10)}
              </Col>
              {order.orderItems.map((product) => (
                <Row key={product._id}>
                  <Col xs={3}>
                    <Image className='img-fluid' src={product.image} alt='' />
                  </Col>
                  <Col xs={6}>
                    <Row>{product.name}</Row>
                    <Row>Quantity: {product.qty}</Row>
                  </Col>
                  <Col xs={3} className='align-self-end'>
                    <Row>
                      <Col>
                        <Image
                          className='img-fluid'
                          src='/assets/img/digi_dollar.png'
                        />
                      </Col>
                      <Col>{product.qty * product.price}</Col>
                    </Row>
                  </Col>
                </Row>
              ))}
              <Row className='justify-content-end'>
                {/* <Col xs={2}>
                  <h3 className='p-0 m-0'>
                    <Badge pill bg='warning' text='dark'>
                      Debit
                    </Badge>
                  </h3>
                </Col> */}
                <Col xs={2}>Total: </Col>

                <Col xs={3}>
                  <Row>
                    <Col xs={6}>
                      <Image
                        className='img-fluid'
                        src='/assets/img/digi_dollar.png'
                      />
                    </Col>
                    <Col xs={6}>{order.totalPrice}</Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          ))
          cards.map((card) => (
            <Row key={cards._id}>
              <Col xs={6}>Card ID: {card.cardId}</Col>
              <Col xs={6}>Date</Col>
              <Row>
                <Col xs={2}>Img</Col>
                <Col xs={5}></Col>
                <Col xs={5}>
                  {/* <Row xs={6}>CR</Row> */}
                  <Row xs={6}>Total</Row>
                </Col>
              </Row>
            </Row>
          ))
        )}
        {loadingCards !== false ? (
          <Loader />
        ) : (
          cards.map((card) => (
            <Row key={cards._id}>
              <Col xs={6}>Card ID: {card.cardId}</Col>
              <Col xs={6}>Date</Col>
              <Row>
                <Col xs={2}>Img</Col>
                <Col xs={5}></Col>
                <Col xs={5}>
                  {/* <Row xs={6}>CR</Row> */}
                  <Row xs={6}>Total</Row>
                </Col>
              </Row>
            </Row>
          ))
        )}
        {/* <Row>
          <Col md={9}>
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
                    <th>DETIALS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
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
        </Row> */}
      </Container>
    </>
  )
}

export default TransactionScreen
