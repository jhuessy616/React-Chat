import { useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import FullWidthButton from "../Buttons/FullWidthButton";



function RoomCreate(props) {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const formRef = useRef();


    async function handleSubmit(e) {
        e.preventDefault();
        const name = nameRef.current.value
        const description = descriptionRef.current.value




        let url = `http://localhost:4000/room/create`

        let bodyObject = JSON.stringify({ name, description})

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token);

        const requestOptions = {
            headers: myHeaders,
            body: bodyObject,
            method: "POST",
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            props.fetchRooms()
            formRef.current.reset()
        } catch (error) {
            console.log(error.message)
        }


    }

    
    
  return (
      <>
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
                  <Button style={{ backgroundColor: "rgb(187,8,11)" }} type="submit">Create Room</Button>
              </FullWidthButton>

              </Form>
              </div>
      </>
      
  )
}

export default RoomCreate
