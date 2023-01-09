// ! RoomCreate-----------------------------------------------------
//! Imports----------------------------------------------------
import { useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import FullWidthButton from "../Buttons/FullWidthButton";
// ! React Component-------------------------------------------------------------
function RoomCreate(props) {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const formRef = useRef();
  // sunmit function
  async function handleSubmit(e) {
    e.preventDefault();
    // will set the constants to the input that is in the form
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    // the url to create a message
    let url = `http://localhost:4000/room/create`;
    // the bodyobject we are sending the the server
    let bodyObject = JSON.stringify({ name, description });
    // Sending headers that will pass the Authorization token and send the content type as json
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);
    // complete request to send to the server
    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    // try where we will await a response from the server and create a room
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      // then we need to fetch the rooms so it includes the new room
      props.fetchRooms();
      // reset the form
      formRef.current.reset();
      // Catch for server errors
    } catch (error) {
      console.log(error.message);
    }
  }
  // ?------------------The return, which is what is visible to the client
  return (
    <>
      {/* The form has an area to input a name and description and a submit button*/}
      <div className="createRoom">
        <h2>Create a Room</h2>
        <Form innerRef={formRef} onSubmit={handleSubmit} className="createForm">
          <FormGroup>
            <Label>Room Name</Label>
            <Input innerRef={nameRef} />
          </FormGroup>

          <FormGroup>
            <Label> Room Description</Label>
            <Input type="textarea" innerRef={descriptionRef} />
          </FormGroup>

          <FullWidthButton>
            <Button style={{ backgroundColor: "rgb(187,8,11)" }} type="submit">
              Create Room
            </Button>
          </FullWidthButton>
        </Form>
      </div>
    </>
  );
}
// exporting the roomcreate
export default RoomCreate;
