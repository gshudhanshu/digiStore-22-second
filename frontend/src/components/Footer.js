import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center'>
            Copyright &copy; 2021 Digicel Group. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
