// ! Component that will Display All Rooms---------------------------------------------------

// !Imports -------------------------------------
import React from "react";
import { useState, useRef } from "react";
import jwt_decode from "jwt-decode";
import {
  Input,
  Form,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import "./message.css";

// ! React Component-------------------------------------------------------------
// ? Constants and everything we are passing to the server---------------------------------------------------------------------
function MessageDisplay(props) {
  console.log(props);
  const decoded = props.token ? jwt_decode(props.token) : "";
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState();
  const bodyRef = useRef();

  // TODOD for bottom scrolling
  // const bottomRef = useRef(null);

  // ! Delete room function ----------------------------------------------------------------
  async function deleteMessage(id) {
    const url = `http://localhost:4000/message/delete/${id}`;
    // Sending headers that will pass the Authorization token
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    // complete request to send to the server
    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };
    // try where we will await a response from the server and delete one item
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      console.log(data);
      // if successfully deleted, we need to fetch the messages again so we no longer display the deleted message
      props.fetchMessages();
      // if successful will continue on it's merry way though the code
      if (data.message === "Message was deleted") {
        // if unsuccessful an alert will show the message as to why it wasn't deleted.
      } else {
        alert(data.message);
      }
      // Catch for server errors
    } catch (err) {
      console.log(err);
    }
  }
  // !Update Message function-----------------------------------------------------------------------
  async function update(e) {
    e.preventDefault();
    setIsUpdate(false);
    console.log("updated");
    //  will grab the value in the input field
    const body = bodyRef.current.value;
    // Url for message edit
    let url = `http://localhost:4000/message/update/${updateId}`;
    // body we will send to the server
    let bodyObject = JSON.stringify({ body });
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
      // if successful we will fetch all messages so that the update is properly displayed
      props.fetchMessages();
      console.log(data);
      // Catch for server errors
    } catch (error) {
      console.log(error.message);
    }
  }

  // !TODO ------------------------------------------------------- message scroll
  //  useEffect(() => {
  //   // 👇️ scroll to bottom every time messages change
  //   bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  // }, [props.messages]);

  // ?------------------The return, which is what is visible to the client
  return (
    <>
      {/* displaying all messages by mapping through the array */}
      <div className="messageDisplay">
        <ul className="message-list">
          {props.messages.map((message) => (
            <li key={message._id} className="message">
              <div className="messageHeader">
                <b className="username"> {message.user.userName} </b>
                {message.when}
              </div>
              {/* Toggle down menu that will only allow users to update and delete their own messages and admins to delete any message  */}
              <UncontrolledDropdown>
                <DropdownToggle tag="span">
                  {isUpdate && updateId == message._id ? (
                    <Form onSubmit={update}>
                      <Input
                        innerRef={bodyRef}
                        defaultValue={message.body}
                      ></Input>
                    </Form>
                  ) : (
                    <div className="messageBody">{message.body}</div>
                  )}
                </DropdownToggle>

                <DropdownMenu>
                  {decoded.id === message.user._id ? (
                    <div>
                      <>
                        <DropdownItem
                          onClick={() => {
                            setIsUpdate(true);
                            setUpdateId(message._id);
                            console.log("update");
                          }}
                        >
                          {" "}
                          Edit
                        </DropdownItem>
                      </>
                    </div>
                  ) : null}

                  {decoded.isAdmin === true ||
                  decoded.id === message.user._id ? (
                    <div>
                      <>
                        <DropdownItem
                          onClick={() => deleteMessage(message._id)}
                        >
                          Delete
                        </DropdownItem>
                      </>
                    </div>
                  ) : null}
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
          ))}
        </ul>
      </div>

      {/* If we want automatic scrolling */}
      {/* <div ref={bottomRef} /> */}
    </>
  );
}
// Exporting the messagedisplay
export default MessageDisplay;
