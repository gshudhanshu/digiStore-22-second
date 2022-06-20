import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { From, Button, Form } from 'react-bootstrap'

const SearchBox = () => {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex  my-3'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' className='product-search digicel-button '>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
