import RoomCreate from "./RoomCreate"
import { Col, Container, Row } from "reactstrap"
import './roomindex.css'
import RoomDisplay from "./RoomDisplay"

function RoomIndex(props) {
  return (
      <>
          <div className="roombackground">
         
              <Container className="roomcontainer">
                   <h1>Select a Room or Create a Room</h1>
              <Row>
                  <Col md="4">
                      <RoomCreate token={props.token} />
                  </Col>
                  <Col md="8"><RoomDisplay token={props.token}/></Col>
              </Row>
          </Container>
          </div>
      </>
  )
}

export default RoomIndex