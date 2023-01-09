// !Auth ---------------------------------------------------------------------
// !Imports ---------------------------------------------------------------------
import Signup from "./signup/Signup";
import { Col, Container, Row } from "reactstrap";
import Login from "./login/Login";
import "./auth.css";

// ! React Component -------------------------------------------------------------
function Auth(props) {
  // ?----------------The return, which is what is visible to the client
  return (
    <>
      {/* Setting it up so signup will be half the page and login the other half */}
      <div className="background">
        <Container className="authcontainer">
          <h1>Welcome to JSQUARED CHAT</h1>
          <Row>
            <Col md="6">
              <Signup updateToken={props.updateToken} />
            </Col>
            <Col md="6">
              <Login updateToken={props.updateToken} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
// Exporting Auth
export default Auth;
