import React, { useState, useEffect } from 'react'
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'

import { InputGroup, Form, Button, Row, Col } from 'react-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Breadcrumb from '../wrappers/Breadcrumb'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function NotFoundScreen() {
  let location = useLocation()

  return (
    <>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + location}>
        404 Page
      </BreadcrumbsItem>
      <Breadcrumb />

      <div className='error-area pt-10 pb-100'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-7 col-lg-8 text-center'>
              <div className='error'>
                <h1>404</h1>
                <h2>OPPS! PAGE NOT FOUND</h2>
                <p>
                  Sorry but the page you are looking for does not exist, have
                  been removed, name changed or is temporarity unavailable.
                </p>
                <Link
                  to={process.env.PUBLIC_URL + '/'}
                  className='digicel-button btn btn-primary'
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundScreen
