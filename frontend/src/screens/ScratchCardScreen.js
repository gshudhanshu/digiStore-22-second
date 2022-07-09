import React, { useState, useEffect } from 'react'
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
  ListGroup,
  Image,
  Accordion,
  Button,
  Offcanvas,
  Container,
  Row,
  Col,
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

import { getUserDetails, updateUserProfile } from '../actions/userActions'

import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import {
  getStaffScrachCardDetails,
  addDigiDollas,
} from '../actions/cardActions'

function ScratchCardScreen() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()
  const navigate = useNavigate()

  const [showCard, setShowCard] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cardScratch = useSelector((state) => state.cardScratch)
  const { cardDetails } = cardScratch

  const handleCardClose = () => setShowCard(false)
  const handleCardShow = () => {
    dispatch(getStaffScrachCardDetails(userInfo))
    setShowCard(true)
  }

  const addDigiDollasHandler = async (e) => {
    // confettiRef.current.fire()
    dispatch(addDigiDollas(userInfo, cardDetails))
  }

  return (
    <>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        Scratch Card
      </BreadcrumbsItem>
      <Breadcrumb />
      <Container>
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <h1 className='scratch-card-title'>SCRATCH N’ WIN</h1>
            <div>
              {showCard && cardDetails && cardDetails.status === 'success' ? (
                <>
                  <ScratchCard
                    width={300}
                    height={400}
                    image={backgroundImageSrc}
                    finishPercent={30}
                    fadeOutOnComplete
                    onComplete={(e) => addDigiDollasHandler(e)}
                  >
                    <div
                      className='scratch-card-bg'
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <>
                        <Row className='no-gutters heading'>Congrats!</Row>
                        <Row className='no-gutters coinDigiDollas'>
                          <Image
                            className='scratch-coin'
                            fluid
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
                  <Button
                    className='btn btn-primary digicel-button'
                    onClick={handleCardClose}
                  >
                    New Card
                  </Button>
                </>
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
                  <Button
                    className='btn btn-primary digicel-button'
                    onClick={handleCardShow}
                  >
                    Show Card
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default ScratchCardScreen
