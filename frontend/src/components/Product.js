import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

const Product = ({ product }) => {
  // const { id } = useParams()
  // const navigate = useNavigate()
  // const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    // navigate(`/cart/${product._id}?qty=${qty}`)
    dispatch(addToCart(product._id))
  }

  return (
    <>
      <div className='product-wrap mb-25'>
        <div className='product-img'>
          <Link to={`/product/${product._id}`}>
            <img className='default-img' src={product.image} alt='' />
            <img className='hover-img' src={product.image} alt='' />
          </Link>
          <div className='product-action'>
            <div className='pro-same-action pro-cart'>
              <Button
                onClick={addToCartHandler}
                className='btn-block'
                type='button'
                disabled={product.countInStock === 0}
              >
                <i className='pe-7s-cart'></i> Add to cart{' '}
              </Button>
            </div>
            <div className='pro-same-action pro-quickview'>
              <Link title='Quick View' to={`/product/${product._id}`}>
                <i className='pe-7s-look'></i>
              </Link>
            </div>
          </div>
        </div>
        <div className='product-content text-center'>
          <h3>
            <Link to={`/product/${product._id}`}>
              <Card.Title as='div'>
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>
          </h3>

          <div className='product-price'>
            <img
              className='price-dollas-icon'
              src={'/assets/img/digi_dollar.png'}
              alt='Digi dollas'
            />
            <div>{product.price}</div>
            <span>Digi Dollas</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
