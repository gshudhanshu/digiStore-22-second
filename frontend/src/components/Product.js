import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
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
              <button className='' title='Add to cart'>
                <i className='pe-7s-cart'></i> Add to cart{' '}
              </button>
            </div>
            <div className='pro-same-action pro-quickview'>
              <button title='Quick View'>
                <i className='pe-7s-look'></i>
              </button>
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
          {/* <div className='product-rating'>
            <i className='fa fa-star-o yellow'></i>
            <i className='fa fa-star-o yellow'></i>
            <i className='fa fa-star-o yellow'></i>
            <i className='fa fa-star-o yellow'></i>
            <i className='fa fa-star-o'></i>
          </div> */}
          {/* <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text> */}

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
