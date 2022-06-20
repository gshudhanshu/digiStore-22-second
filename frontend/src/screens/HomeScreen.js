import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  ListGroup,
  Button,
  Offcanvas,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
// import { Icon } from 'react-materialize'
import ScratchCard from 'react-scratchcard-v2'

import backgroundImageSrc from '../assets/img/card-img.jpg'

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import { getScrachCardDetails, addDigiDollas } from '../actions/cardActions'

// import ProductsCarousel from '../components/ProductsCarousel'
import Meta from '../components/Meta'
import SearchBox from '../components/SearchBox'

const HomeScreen = () => {
  let isScratched = false
  const { keyword, pageNumber = '1' } = useParams()
  let location = useLocation()

  const [showCard, setShowCard] = useState(false)
  // const [cardScratch, setCardScratch] = useState(false)
  // const [cardScratchCompleted, setCardScratchCompleted] = useState(false)

  const ref = useRef < ScratchCard > null
  const onClickReset = () => {
    ref.current && ref.current.reset()
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { loading: loadingUser, error: errorUser, userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const cardScratch = useSelector((state) => state.cardScratch)
  const { cardDetails } = cardScratch

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const addDigiDollasHandler = async (e) => {
    dispatch(addDigiDollas(userInfo, cardDetails))
  }

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

      <Button
        className='btn-circle btn-lg rounded-circle emoji-button'
        variant='primary'
        type='button'
        onClick={handleCardShow}
      >
        <img
          src='./assets/img/emoji.png'
          alt='scratch window launch button'
        ></img>
      </Button>

      {/* <Button
        className='btn-circle btn-lg'
        floating
        node='button'
        waves='light'
        onClick={handleCardShow}
      >
        <img
          src='./assets/img/emoji.png'
          alt='scratch window launch button'
        ></img>
      </Button> */}

      <Offcanvas
        show={showCard}
        onHide={handleCardClose}
        scroll={false}
        placement='end'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Scratch card</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h2>Reveal your card</h2>
          <div>
            {/* {cardDetails.status === 'success' ? (
              (<ScratchCard
                width={300}
                height={300}
                image={backgroundImageSrc}
                finishPercent={30}
                fadeOutOnComplete
                // onComplete={!isCompleted && !cardScratchCompleted && addDigiDollasHandler}
                onComplete={(e) => addDigiDollasHandler(e)}
              >
                <div
                  className='scratch-card-bg'
                  style={{
                    width: '100%',
                    height: '100%',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // background: '#E8E8E8',
                  }}
                >
                  {cardDetails && (
                    <>
                      <Row className='no-gutters heading'>Congrats!</Row>
                      <Row className='no-gutters digiDollas'>{`${cardDetails.digiDollas}`}</Row>
                      <Row className='no-gutters message'>{`Yay! You've won ${cardDetails.digiDollas}`}</Row>
                      <Row className='note'>
                        <p>{`This will be credited to your DigiDollas`}</p>
                      </Row>
                    </>
                  )}
                </div>
              </ScratchCard>)(cardDetails.status === 'fail')
            ) : (
              <h1>Sorry! You have already scratched today's card</h1>
            )} */}

            {cardDetails && cardDetails.status === 'success' ? (
              <ScratchCard
                width={300}
                height={300}
                image={backgroundImageSrc}
                finishPercent={30}
                fadeOutOnComplete
                // onComplete={!isCompleted && !cardScratchCompleted && addDigiDollasHandler}
                onComplete={(e) => addDigiDollasHandler(e)}
              >
                <div
                  className='scratch-card-bg'
                  style={{
                    width: '100%',
                    height: '100%',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // background: '#E8E8E8',
                  }}
                >
                  <>
                    <Row className='no-gutters heading'>Congrats!</Row>
                    <Row className='no-gutters digiDollas'>{`${cardDetails.digiDollas}`}</Row>
                    <Row className='no-gutters message'>{`Yay! You've won ${cardDetails.digiDollas}`}</Row>
                    <Row className='note'>
                      <p>{`This will be credited to your DigiDollas`}</p>
                    </Row>
                  </>
                </div>
              </ScratchCard>
            ) : cardDetails && cardDetails.status === 'fail' ? (
              <h1>Sorry! You have already scratched today's card</h1>
            ) : (
              <h1>Please login</h1>
            )}
          </div>
          <Row>
            <h4>How does it work?</h4>
            <ListGroup as='ol' numbered variant='flush'>
              <ListGroup.Item as='li'>
                Scratch to see your winning amount
              </ListGroup.Item>
              {/* <ListGroup.Item as='li'>
                Scratch card is available only for Digicel customers
              </ListGroup.Item> */}
              {/* <ListGroup.Item as='li'>
                You should have any active plan
              </ListGroup.Item> */}
              <ListGroup.Item as='li'>
                You can use DigiDollas to purchase listed product
              </ListGroup.Item>
            </ListGroup>
          </Row>
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

            <Row className='all-products-container'>
              {products.map((product) => (
                <Col
                  className='single-product-container'
                  key={product._id}
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                >
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
