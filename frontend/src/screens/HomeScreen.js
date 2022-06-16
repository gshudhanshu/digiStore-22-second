import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Offcanvas, Container, Row, Col } from 'react-bootstrap'
import ScratchCard from 'react-scratchcard-v3'
import foregroundImageSrc from '../assets/img/placeimg_400_300_people.jpg'
import backgroundImageSrc from '../assets/img/placeimg_400_300_arch.jpg'

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import Breadcrumb from '../wrappers/Breadcrumb'
import ShopTopbar from '../wrappers/ShopTopbar'

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import { getScrachCardDetails } from '../actions/userActions'
// import ProductsCarousel from '../components/ProductsCarousel'
import Meta from '../components/Meta'
import SearchBox from '../components/SearchBox'

const HomeScreen = () => {
  const { keyword, pageNumber = '1' } = useParams()
  let location = useLocation()

  const [showCard, setShowCard] = useState(false)
  const [cardScratch, setCardScratch] = useState(false)

  const ref = useRef < ScratchCard > null
  const onClickReset = () => {
    ref.current && ref.current.reset()
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { loading: loadingUser, error: errorUser, userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  // Card Offcanvas handlers
  const handleCardClose = () => setShowCard(false)
  const handleCardShow = () => {
    dispatch(getScrachCardDetails(userInfo))

    setShowCard(true)
  }

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

      <Button variant='primary' onClick={handleCardShow}>
        Launch
      </Button>

      <Offcanvas show={showCard} onHide={handleCardClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Scratch card</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <button onClick={onClickReset}>Reset</button>
            <ScratchCard
              width={250}
              height={300}
              image={backgroundImageSrc}
              finishPercent={70}
              onComplete={() => console.log('complete')}
            >
              <div
                className='scratch-card-bg'
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'red',
                }}
              >
                <h1>Scratch card</h1>
              </div>
            </ScratchCard>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

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
