import { useRef, useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import FullWidthButton from "../Buttons/FullWidthButton";



function RoomEdit(props) {


    const nameRef = useRef();
    const descriptionRef = useRef();
    const [roomName, setRoomName] = useState();
    const [roomDescription, setRoomDescription] = useState();
    const formRef = useRef();


    async function handleSubmit(e) {
        e.preventDefault();
        props.setUpdateMode(false);

        const name = nameRef.current.value
        const description = descriptionRef.current.value

        let url = `http://localhost:4000/room/update/${props.updateId}`

        let bodyObject = JSON.stringify({ name, description})

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token);

        const requestOptions = {
            headers: myHeaders,
            body: bodyObject,
            method: "PATCH",
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            props.fetchRooms()
            console.log(data)
            formRef.current.reset()
        } catch (error) {
            console.log(error.message)
        }


    }

    const fetchRoom = async () => {
        const url = `http://localhost:4000/room/${props.updateId}`;
        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log("data", data)
            setRoomName(data.room.name);
            setRoomDescription(data.room.description);

        } catch (err) {
            console.log(err.message);
        }
    };

    /* useEffect(() => {
        if (props.token) {
            fetchRoom();
        }
    }, [props.token]); */
  
    useEffect(() => {
        fetchRoom();
    }, [props.updateId]);
    
    
  return (
      <>
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
                  <Button style={{ backgroundColor: "rgb(187,8,11)" }} type="submit">Update Room</Button>
              </FullWidthButton>

          </Form>
      </>
      
  )
}

export default RoomEdit
