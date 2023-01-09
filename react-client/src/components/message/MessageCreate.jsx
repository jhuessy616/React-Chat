// ! Message Create-----------------------------------------------------
//! Imports----------------------------------------------------
import { useRef } from "react";
import { Form, Input } from "reactstrap";
// ! React Component-------------------------------------------------------------
function MessageCreate(props) {
  const bodyRef = useRef();
  const formRef = useRef();
  // submit function
  async function handleSubmit(e) {
    e.preventDefault();
    // will set body to whatever is in the inout field
    const body = bodyRef.current.value;
    // the url to create a message
    let url = `http://localhost:4000/message/create/${props.roomId}`;
    // the bodyobject we are sending the the server
    let bodyObject = JSON.stringify({ body });
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
    // try where we will await a response from the server and create a message
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      // then we need to fetch the messages so it includes the new message
      props.fetchMessages();
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
      {/* The "form" will be a text input area for a message */}
      <div className="createMessage">
        <Form
          innerRef={formRef}
          onSubmit={handleSubmit}
          className="send-message-form"
        >
          <Input
            innerRef={bodyRef}
            placeholder="Type your message and hit ENTER"
            type="text"
          />
        </Form>
      </div>
    </>
  );
}
// exporting create message
export default MessageCreate;
