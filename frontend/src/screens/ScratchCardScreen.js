import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { useMeasure } from 'react-use'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'

import Countdown from 'react-countdown'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin

import {
  Offcanvas,
  Form,
  Image,
  Button,
  Container,
  Row,
  Card,
} from 'react-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

import ScratchCard from 'react-scratchcard-v4'

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

import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Confetti from '../components/Confetti'

import { getUserDetails, updateUserProfile } from '../actions/userActions'

import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import {
  getStaffScrachCardDetails,
  saveStaffScratchCard,
} from '../actions/cardActions'

function ScratchCardScreen() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()
  const navigate = useNavigate()

  // const [offCanvasRef, { offCanvasWidth, offCanvasHeight }] = useMeasure()
  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure()
  const childFireFunc = React.useRef(null)

  const [showCard, setShowCard] = useState(false)
  const [mobile, setMobile] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cardScratch = useSelector((state) => state.cardScratch)
  const { cardDetails } = cardScratch

  const handleCardClose = () => setShowCard(false)
  const handleCardShow = (e) => {
    e.preventDefault()
    dispatch(getStaffScrachCardDetails(userInfo, mobile, image))
    setShowCard(true)
  }

  const addDigiDollasHandler = async (e) => {
    childFireFunc.current()
    dispatch(saveStaffScratchCard(userInfo, cardDetails))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        Scratch Card
      </BreadcrumbsItem>
      <Breadcrumb />
      <Confetti childFireFunc={childFireFunc} />
      <Offcanvas
        className='staff-ScratchCard'
        show={showCard}
        onHide={handleCardClose}
        scroll={false}
        placement='end'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='mx-auto'></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body ref={ref}>
          <div>
            {cardDetails && cardDetails.status === 'success' ? (
              <ScratchCard
                width={width}
                height={height}
                image={backgroundImageSrc}
                finishPercent={30}
                fadeOutOnComplete
                // onComplete={!isCompleted && !cardScratchCompleted && addDigiDollasHandler}
                onComplete={(e) => addDigiDollasHandler(e)}
              >
                <div
                  className='staff-scratch-card-bg scratch-card-bg'
                  style={{
                    width: '100%',
                    height: '100%',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // background: '#E8E8E8',
                  }}
                >
                  <>
                    <img
                      alt=''
                      className='staff-scratch-card-logo'
                      src={'/assets/img/logo.png'}
                    />
                    {/* <Row className='no-gutters digiDollas'>{`${cardDetails.digiDollas}`}</Row> */}
                    <div className='staff-scratch-content'>
                      <Row className='no-gutters heading'>Congrats!</Row>
                      <Row className='no-gutters won-product-img-container'>
                        <Image
                          className='scratch-coin won-product-img'
                          fluid
                          src={cardDetails.product.image}
                          alt={''}
                          rounded
                        ></Image>
                      </Row>
                      <Row className='no-gutters message'>{`Yay! You've won ${cardDetails.product.name}`}</Row>
                    </div>
                    <Row className='note'>
                      <p>
                        {`Enjoy scratching! `}{' '}
                        <span role='img' aria-label='excited'>
                          🤩
                        </span>
                      </p>
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
        </Offcanvas.Body>
      </Offcanvas>

      <Container className='d-flex justify-content-center align-items-center'>
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <h1 className='scratch-card-title text-center'>SCRATCH N’ WIN</h1>
            <>
              <Form onSubmit={handleCardShow}>
                <Form.Group className='mb-3' controlId='mobile'>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type='mobile'
                    placeholder='Enter Mobile'
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                  <Form.Text className='text-muted'>Format: 1234567</Form.Text>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    className='mb-3'
                    type='file'
                    onChange={uploadFileHandler}
                    label='Choose File'
                    required
                  />
                  {uploading && <Loader />}
                  <Form.Control
                    className='mb-3'
                    type='text'
                    placeholder='Image URL'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    disabled
                  ></Form.Control>
                </Form.Group>
                <Button
                  variant='primary'
                  type='submit'
                  className='btn btn-primary digicel-button'
                >
                  Show Card
                </Button>
              </Form>
            </>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default ScratchCardScreen
