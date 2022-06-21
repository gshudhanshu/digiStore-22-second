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
        <h2 className='transaction-title'>Product Orders</h2>
        {loadingOrders && loadingCards ? (
          <Loader />
        ) : error || !orders ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          orders.map((order) => (
            <div className='order-container' key={order._id}>
              <div className='order-sub-container'>
                <Row className='orderid-date-container'>
                  <Col className='order orderId'>Order ID: {order.orderId}</Col>
                  <Col className='order order-date'>
                    Date: {order.createdAt.substring(0, 10)}
                  </Col>
                </Row>
                {order.orderItems.map((product) => (
                  <Row key={product._id} className='product-container'>
                    <Col className='order img-container'>
                      <Image
                        className=' img-fluid'
                        src={product.image}
                        alt=''
                      />
                    </Col>
                    <Col className=' order-product-price-qty'>
                      <Row className=' product-name'>{product.name}</Row>
                      <Row className=' product-price-qty'>
                        <Col className='qty'>Quantity: {product.qty}</Col>
                        <Col>
                          <Row className='order-product-price'>
                            <Image
                              className='order img-fluid'
                              src='/assets/img/digi_dollar.png'
                            />
                            {product.qty * product.price}
                            {/* <Col xs={6}>{product.qty * product.price}</Col> */}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </div>
              <Row className='order-total-price justify-content-end'>
                <Col>
                  Total:{' '}
                  <Image
                    className='img-fluid'
                    src='/assets/img/digi_dollar.png'
                  />
                  {order.totalPrice}
                </Col>
              </Row>
            </div>
          ))
        )}
        <h2 className='transaction-title'>Scratch Cards</h2>

        {loadingCards ? (
          <>{/* <Loader /> */}</>
        ) : error || !cards ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          cards.map((card) => (
            <>
              <div className='scrached-cards-container' key={card._id}>
                <div className='scrached-cards-subcontainer'>
                  Card ID: {card.cardId}
                </div>
                <div className='scrached-cards-subcontainer'>
                  Date: {card.createdAt.substring(0, 10)}
                </div>
                <div className='scratchcard-price'>
                  <div>
                    <Image
                      className='img-fluid'
                      src='/assets/img/digi_dollar.png'
                    />
                  </div>
                  <div>{card.digiDollas}</div>
                </div>
              </div>
            </>
          ))
        )}
      </Container>
    </>
  )
}

export default TransactionScreen
