import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bottom-footer'>
      <Container>
        <Row>
          <Col className='copyright text-center'>
            Copyright &copy; 2022 Digicel Group. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
