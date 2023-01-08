// ! Component that will Display All Rooms---------------------------------------------------

// !Imports -------------------------------------
import React from 'react'
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import './message.css'


// ! React Component-------------------------------------------------------------
function MessageDisplay(props) {
    console.log(props);
    const decoded = props.token ? jwt_decode(props.token) : "";
    const navigate = useNavigate();

    // ! Delete room function ----------------------------------------------------------------
    async function deleteMessage(id) {
        const url = `http://localhost:4000/message/delete/${id}`;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        let requestOptions = {
            headers: myHeaders,
            method: "DELETE",
        };
        try {
            let response = await fetch(url, requestOptions);
            let data = await response.json();
            console.log(data);
            props.fetchMessages()
            if (data.message === "Message was deleted") {
            }
            else {
                alert(data.message)
            }
        } catch (err) {
            console.log(err);
        }
    }

    // ! Edit Message function-------------------------------------------------------------------------
    return (
        <>
            {/* displaying all messages by mapping through the array */}
            <ul className="message-list">
                   {props.messages.map((message) => (
                <li key= {message._id} className="message">
                           <div>{message.user.userName} {message.when}</div>
                    <div>{message.body}</div>
                   
                           {decoded.isAdmin === true || decoded.id === message.user._id ? (
                               <div>
                        <>
                                   {" "}
                                   
                            <Button
                  color="warning"
                  onClick={() => { console.log("update")
                  }}>
               Edit
                </Button>
                            <Button onClick={() => deleteMessage(message._id)} color="danger">Delete</Button>
                                   </>
                                   </div>
                                   
                           ) : null}
                           </li>
          </ul>
            ))
            
        </>
    )
}

export default MessageDisplay
