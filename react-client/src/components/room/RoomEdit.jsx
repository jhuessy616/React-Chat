// !Room Update-------------------------------------------------------------------

// !Imports -------------------------------------
import { useRef, useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import FullWidthButton from "../Buttons/FullWidthButton";

// ! React Component-------------------------------------------------------------
// ? Constants and everything we are passing to the server---------------------------------------------------------------------
function RoomEdit(props) {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [roomName, setRoomName] = useState();
  const [roomDescription, setRoomDescription] = useState();
  const formRef = useRef();

  // submit function
  async function handleSubmit(e) {
    e.preventDefault();
    props.setUpdateMode(false);
    //  will grab the values in the inputs
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    // Url for room edit
    let url = `http://localhost:4000/room/update/${props.updateId}`;
    // body we will send to the server
    let bodyObject = JSON.stringify({ name, description });
    // Sending headers that tell content type and sending the token in authorization
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);
    // complete request to send to the server
    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "PATCH",
    };
    // try where we will await a response from the server
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      // if successful we will fetch the rooms so that the update is properly displayed
      props.fetchRooms();
      console.log(data);
      // will reset the form
      formRef.current.reset();
      // Catch for server errors
    } catch (error) {
      console.log(error.message);
    }
  }
  // Fetching one room to populate the data in our form, to make for easier editing
  const fetchRoom = async () => {
    // url to get one
    const url = `http://localhost:4000/room/${props.updateId}`;
    // Sending headers with the token in authorization
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    // complete request to send to the server
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    // try where we will await a response from the server
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("data", data);
      // we want to set the room name and description based on the data that was returned.
      setRoomName(data.room.name);
      setRoomDescription(data.room.description);
      // Catch for server errors
    } catch (err) {
      console.log(err.message);
    }
  };
  // fetching the room info when the user hits edit
  useEffect(() => {
    fetchRoom();
  }, [props.updateId]);

  // ?------------------The return, which is what is visible to the client
  return (
    <>
      {/* Our form
      // Has a name and description and an update button that will only appear for admins */}
      <Form innerRef={formRef} onSubmit={handleSubmit}>
        <h2>Update a Room</h2>
        <FormGroup>
          <Label>Room Name</Label>
          <Input
            value={roomName}
            innerRef={nameRef}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label> Room Description</Label>
          <Input
            value={roomDescription}
            type="textarea"
            innerRef={descriptionRef}
            onChange={(e) => setRoomDescription(e.target.value)}
          />
        </FormGroup>

        <FullWidthButton>
          <Button style={{ backgroundColor: "rgb(187,8,11)" }} type="submit">
            Update Room
          </Button>
        </FullWidthButton>
      </Form>
    </>
  );
}

export default RoomEdit;
