// ! Edit Room ----------------------------------------------------------------------------------
// ! Imports --------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import FullWidthButton from "../Buttons/FullWidthButton";

 // ! Edit Room function need this to be here to pass to both room create and roomdisplay -------------------------------------------------------------------------
function RoomEdit(props) {
    const { id } = useParams();
    const [roomName, setRoomName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
     const clearState = () => {
        setRoomName('')
        setRoomDescription('')
    }
  

    async function handleSubmit(e) {
      e.preventDefault();
      let url = `http://localhost:4000/room/update/${id}`;

      let bodyObj = JSON.stringify({
        name: roomName,
        description: roomDescription
      });

      let myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        headers: myHeaders,
        body: bodyObj,
        method: "PATCH",
      };

      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data);
        if (data.message === "room updated") {
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 5000);
           clearState()
        }
      } catch (error) {
        console.log(error);
      }
    }
    const fetchRoom = async () => {
      const url = `http://localhost:4000/room/${id}`;
      let myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data)
        setRoomName(data.room.name);
        setRoomDescription(data.room.description);
    
      } catch (err) {
        console.log(err.message);
      }
    };

    useEffect(() => {
      if (props.token) {
        fetchRoom();
      }
    }, [props.token]);
  
  
     return (
 <>
      <Container>
        <Row>
        
            {showSuccessMessage ? (
              <Alert color="success">Room was updated</Alert>
            ) : null}
         
          <Col md="8">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Room Name</Label>
                <Input
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Room Description</Label>
                <Input
                  type="textarea"
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                />
              </FormGroup>
              
              <FullWidthButton>
                <Button>Update Room</Button>
              </FullWidthButton>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};


export default RoomEdit