// ! Message Index ----------------------------------------------------------------

// !Imports Section -------------------------------------------------------------
import MessageCreate from "./MessageCreate"
import { Col, Container, Row } from "reactstrap"
import './message.css'
import MessageDisplay from "./MessageDisplay"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

// ! React Component -------------------------------------------------------------
 // ? Contants and everything we are passing to the server---------------------------------------------------------------------
function MessageIndex(props) {
    const { id, name } = useParams();
    // Setting up state so we can edit/update the messages. 
    const [messages, setMessages] = useState([]);
    // Fetching all rooms from our database so we will be able to access and display them in MessageCreate and MessageDisplay.
    const fetchMessages = async () => {
    //   everything we need to send to the database being stored in variables
    const url = `http://localhost:4000/message/getall/${id}`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
        // try and catch going to the server
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
        console.log(data);
        setMessages(data.allMessagesFromRoom)
    } catch (err) {
      console.log(err.message);
    }
    };
    // Useeffect to call on our async function of fetch rooms. Important token is there or it will fire before the token has loaded and will return an empty array.
  useEffect(() => {
    if (props.token) {
      fetchMessages();
    }
  }, [props.token]);

   
 // ?------------------The return, which is what is visible to the client
  return (
      <>
      {/* contains a create area and a display area, creat will use 1/3 of the screen and the display will take up the other 2/3rds */}
      <body className="messagebackground">
          
         
              <Container className="messagecontainer">
                  <h1>Welcome to the {name} Chat</h1>
                          <MessageDisplay token={props.token} messages={messages} fetchMessages={fetchMessages} />
                   
                      <MessageCreate token={props.token} fetchMessages={fetchMessages} />
                  

                  
          </Container>
         </body>
      </>
  )
}

// exporting the MessageIndex
export default MessageIndex