import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
  return (
    <Container className='login-register-wrapper'>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={12} lg={7}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
