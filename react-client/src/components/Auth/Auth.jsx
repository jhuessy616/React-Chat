import Signup from "./signup/Signup";
import { Col, Container, Row } from "reactstrap";
import Login from "./login/Login";
 
import "./auth.css"

function Auth(props) {
  return (
      <>
          <div className="background">
          <Container className="authcontainer">
          <h1>Welcome to JSQUARED CHAT</h1>
              <Row>
                  <Col md="6">
          <Signup   updateToken={props.updateToken}/>
                  </Col>
                 <Col md="6">
          <Login updateToken={props.updateToken}/>
                  </Col> 
              </Row>
              
              </Container>
              </div>
          </>
  )
}

export default Auth