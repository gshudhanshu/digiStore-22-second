import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import Breadcrumb from '../wrappers/Breadcrumb'
import ShopTopbar from '../wrappers/ShopTopbar'

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import ProductsCarousel from '../components/ProductsCarousel'
import Meta from '../components/Meta'
import SearchBox from '../components/SearchBox'

const HomeScreen = () => {
  const { keyword, pageNumber = '1' } = useParams()
  let location = useLocation()

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {/* {!keyword ? (
        <ProductsCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )} */}

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
        Welcome To DigiStore
      </BreadcrumbsItem>
      <Breadcrumb />

      <Container>
        {/* <h1 className='text-center page heading'>Welcome to DigiStore</h1> */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <SearchBox />
            {/* shop topbar default */}
            {/* <ShopTopbar
            // getLayout={getLayout}
            // getFilterSortParams={getFilterSortParams}
            // productCount={products.length}
            // sortedProductCount={currentData.length}
            // />*/}

            <Row>
              {products.map((product) => (
                <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                  <h3>
                    <Product product={product} />
                  </h3>
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default HomeScreen
