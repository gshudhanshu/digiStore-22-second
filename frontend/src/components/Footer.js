import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bottom-footer'>
      <Container>
        <Row>
          <Col className='copyright text-center my-4'>
            Copyright &copy; 2021 Digicel Group. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
