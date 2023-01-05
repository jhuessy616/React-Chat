import Signup from "./signup/Signup";
import { Col, Container, Row } from "reactstrap";
import Login from "./login/Login";
 
import "./auth.css"

function Auth() {
  return (
      <>
          <Container>
          <h1>Welcome to JSQUARED CHAT</h1>
              <Row>
                  <Col md="6">
          <Signup />
                  </Col>
                 <Col md="6">
          <Login/>
                  </Col> 
              </Row>
              
          </Container>
          </>
  )
}

export default Auth