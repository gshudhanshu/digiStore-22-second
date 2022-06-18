import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { createNewOrder } from '../actions/orderActions'

const CartScreen = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const productId = id
  const qty = searchParams.get('qty')

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

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

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }

    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [dispatch, navigate, order, productId, qty, success])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = (id) => {
    // navigate('/login?redirect=/shipping')
    // navigate('/login?redirect=/orders/neworder')
    dispatch(
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

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
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
              ${' '}
              {cartItems.reduce(
                (acc, item) => acc + Number(item.qty) * Number(item.price),
                0
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
