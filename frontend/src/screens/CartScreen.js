import React, { useEffect, useState } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

// import SweetAlert from 'react-bootstrap-sweetalert'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { createNewOrder } from '../actions/orderActions'

const CartScreen = () => {
  let location = useLocation()
  const { id } = useParams()
  const MySwal = withReactContent(Swal)

  const [searchParams, setSearchParams] = useSearchParams()
  const [sweetAlert, setSweetAlert] = useState(false)

  const navigate = useNavigate()

  const productId = id
  const qty = searchParams.get('qty')

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const orderNewCreate = useSelector((state) => state.orderNewCreate)
  let {
    loading: loadingNewOrder,
    order: orderNewOrder,
    success: successNewOrder,
    error: errorNewOrder,
    userInfo,
  } = orderNewCreate

  //   Calculate prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice))
  cart.totalPrice = Number(cart.itemsPrice)
    //  +
    // Number(cart.shippingPrice) +
    // Number(cart.taxPrice)
    .toFixed()

  // const orderCreate = useSelector((state) => state.orderCreate)
  // const { order, success, error } = orderCreate

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (productId) {
      dispatch(addToCart(productId, qty))
    }

    // if (successNewOrder) {
    //   navigate(`/order/${orderNewOrder._id}`)
    // }
  }, [dispatch, navigate, orderNewOrder, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = async () => {
    // navigate('/login?redirect=/shipping')
    // navigate('/login?redirect=/orders/neworder')
    await dispatch(
      createNewOrder({
        orderItems: cart.cartItems,
        // shippingAddress: cart.shippingAddress,
        // paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        // shippingPrice: cart.shippingPrice,
        // taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  if (successNewOrder && sweetAlert) {
    MySwal.fire({
      title: 'Order Confirmed!',
      text: 'Thank you for shopping in the DigiStore. Your order has been placed. A representative from the DigiStore will contact you within 48 hours to collect your purchases.',
      icon: 'success',
      focusConfirm: false,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary digicel-button',
      },
    }).then((result) => {
      // setSweetAlert(false)
      successNewOrder = false
    })
  }

  return (
    <>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        Cart
      </BreadcrumbsItem>
      <Breadcrumb />
      {/* <div className='sweetAlert-container'>
        {sweetAlert && (
          <SweetAlert
            success
            className='digicel-button'
            title='Order Confirmed!'
            onConfirm={() => {
              setSweetAlert(false)
            }}
            // onCancel={() => setSweetAlert(false)}
            // timeout={2000}
          >
            Thank you for shopping in the DigiStore. Your order has been placed.
            A representative from the DigiStore will contact you within 48 hours
            to collect your purchases.
          </SweetAlert>
        )}
      </div> */}

      <Container>
        <Row>
          <Col className='cart-main-container'>
            <h1 className='text-center text-md-start'>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Your Cart is empty <Link to='/'>Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item
                    className='cart product-container'
                    key={item.product}
                  >
                    <div className='img-container'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </div>
                    <div className='cart-details-container'>
                      <div>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      {/* <Col md={2}>${item.price}</Col> */}
                      <div className='cart-qty-price-container'>
                        <div className='product-price-delete-container'>
                          <div>
                            <Form.Control
                              as='select'
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </div>

                          <div className='cart-price'>
                            <Image
                              className='img-fluid'
                              src='/assets/img/digi_dollar.png'
                            />
                            {item.price}
                          </div>
                          <div className='trash-button-container'>
                            <Button
                              type='button'
                              // variant='dark'
                              className='trash-button digicel-button'
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce(
                      (acc, item) => Number(acc) + Number(item.qty),
                      0
                    )}
                    ) items
                  </h2>
                  <h4 className='cart-price'>
                    <Image
                      className='img-fluid'
                      src='/assets/img/digi_dollar.png'
                    />
                    {cartItems.reduce(
                      (acc, item) =>
                        acc + Number(item.qty) * Number(item.price),
                      0
                    )}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  {loadingNewOrder ? (
                    <Loader />
                  ) : (
                    <Button
                      type='button'
                      className='btn-block cart-place-order digicel-button'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Place Order
                    </Button>
                  )}

                  {errorNewOrder && (
                    <Message variant='danger'>{errorNewOrder}</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CartScreen
