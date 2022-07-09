import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Countdown from 'react-countdown'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin

import {
  ListGroup,
  Image,
  Accordion,
  Button,
  Offcanvas,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import ScratchCard from 'react-scratchcard-v2'
// import ScratchCard from 'react-scratchcard-v4'

import backgroundImageSrc from '../assets/img/card-img.jpg'
import backgroundImageAlreadyScratched from '../assets/img/already-scratched.jpg'
import scratchButtonGif from '../assets/img/scratch-button-100.gif'
import coin1 from '../assets/img/coins/1.png'
import coin2 from '../assets/img/coins/2.png'
import coin3 from '../assets/img/coins/3.png'
import coin4 from '../assets/img/coins/4.png'
import coin5 from '../assets/img/coins/5.png'
import coin6 from '../assets/img/coins/6.png'
import coin7 from '../assets/img/coins/7.png'
import coin8 from '../assets/img/coins/8.png'
import coin9 from '../assets/img/coins/9.png'
import coin10 from '../assets/img/coins/10.png'
import coin11 from '../assets/img/coins/11.png'
import coin12 from '../assets/img/coins/12.png'
import coin13 from '../assets/img/coins/13.png'
import coin14 from '../assets/img/coins/14.png'
import coin15 from '../assets/img/coins/15.png'

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

  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('America/Barbados')

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
        {/* <img
          src='../assets/img/scratch-button.gif'
          alt='scratch window launch button'
          style={{ width: '50px' }}
        ></img> */}
        <img src={scratchButtonGif} alt='scratch window launch button'></img>
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
          <Offcanvas.Title className='mx-auto'>
            {/* Scratch card */}
            <img alt='' className='logo' src={'/assets/img/logo.png'} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h1 className='scratch-card-title'>SCRATCH N’ WIN</h1>
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
                height={400}
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
                    {/* <Row className='no-gutters digiDollas'>{`${cardDetails.digiDollas}`}</Row> */}
                    <Row className='no-gutters coinDigiDollas'>
                      <Image
                        className='scratch-coin'
                        fluild
                        src={
                          cardDetails.digiDollas === 1
                            ? coin1
                            : cardDetails.digiDollas === 2
                            ? coin2
                            : cardDetails.digiDollas === 3
                            ? coin3
                            : cardDetails.digiDollas === 4
                            ? coin4
                            : cardDetails.digiDollas === 5
                            ? coin5
                            : cardDetails.digiDollas === 6
                            ? coin6
                            : cardDetails.digiDollas === 7
                            ? coin7
                            : cardDetails.digiDollas === 8
                            ? coin8
                            : cardDetails.digiDollas === 9
                            ? coin9
                            : cardDetails.digiDollas === 10
                            ? coin10
                            : cardDetails.digiDollas === 11
                            ? coin11
                            : cardDetails.digiDollas === 12
                            ? coin12
                            : cardDetails.digiDollas === 13
                            ? coin13
                            : cardDetails.digiDollas === 14
                            ? coin14
                            : cardDetails.digiDollas === 15
                            ? coin15
                            : coin1
                        }
                        alt={''}
                        fluid
                        rounded
                      ></Image>
                    </Row>
                    <Row className='no-gutters message'>{`Yay! You've won ${cardDetails.digiDollas}`}</Row>
                    <Row className='note'>
                      <p>{`This will be credited to your DigiDollas`}</p>
                    </Row>
                  </>
                </div>
              </ScratchCard>
            ) : cardDetails && cardDetails.status === 'fail' ? (
              <>
                <div
                  className='ScratchCard__Container'
                  // style={{ width: '300px', height: '330px' }}
                >
                  <img
                    className='img-fluid mx-auto'
                    src={backgroundImageAlreadyScratched}
                    alt=''
                  ></img>
                </div>
                <h2 className='my-3'>
                  Sorry! <br /> Come back later
                </h2>
                <h2>
                  <Countdown
                    className='digicel-gradient-text'
                    date={dayjs() + dayjs().endOf('day').diff(dayjs())}
                  />
                </h2>
              </>
            ) : (
              <>
                <h1>Please login to scratch the card</h1>
                <Link to='/login' className='btn btn-primary digicel-button'>
                  Login
                </Link>
              </>
            )}
          </div>
          {/* <Row> */}
          {/* <h4>How To Scratch N Win?</h4>
            <ListGroup
              className='scratch-user-guide-list'
              as='ol'
              numbered
              variant='flush'
            >
              <ListGroup.Item as='li'>
                Be on an eligible Prime Bundle to <br /> Scratch N’ Win daily.
              </ListGroup.Item>
              <ListGroup.Item as='li'>
                Glide your finger across scratch card <br /> to reveal your
                prize.
              </ListGroup.Item>
            </ListGroup> */}
          <Accordion className='w-100 scratch-user-guide'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>How To Scratch N Win?</Accordion.Header>
              <Accordion.Body>
                <ListGroup
                  className='scratch-user-guide-list'
                  as='ol'
                  numbered
                  variant='flush'
                >
                  <ListGroup.Item as='li'>
                    Be on an eligible Prime Bundle to <br /> Scratch N’ Win
                    daily.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Glide your finger across scratch card <br /> to reveal your
                    prize.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* </Row> */}
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
