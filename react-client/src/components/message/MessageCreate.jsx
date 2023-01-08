import { useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import FullWidthButton from "../Buttons/FullWidthButton";



function MessageCreate(props) {
    const bodyRef = useRef();
    const formRef = useRef();


    async function handleSubmit(e) {
        e.preventDefault();
        const body = bodyRef.current.value
        




        let url = `http://localhost:4000/message/create/${props.roomId}`

        let bodyObject = JSON.stringify({body})

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
            props.fetchMessages()
            formRef.current.reset()
        } catch (error) {
            console.log(error.message)
        }


    }

    
    
  return (
      <>
          <div className="createMessage">
          
          <Form innerRef={formRef} onSubmit={handleSubmit} className="send-message-form">
              
                 
                  <Input innerRef={bodyRef}
              placeholder="Type your message and hit ENTER"
                    type="text"  /> 

        

              </Form>
              </div>
      </>
      
  )
}

export default MessageCreate
