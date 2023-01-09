// ! Component that will Display All Rooms---------------------------------------------------

// !Imports -------------------------------------
import React from 'react'
import { useState, useRef } from "react"
import jwt_decode from "jwt-decode";
import { Button, Input, Form } from "reactstrap";
import './message.css'


// ! React Component-------------------------------------------------------------
function MessageDisplay(props) {
    const decoded = props.token ? jwt_decode(props.token) : "";
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState();
    const bodyRef = useRef();

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
    async function update(e) {
        e.preventDefault();
        setIsUpdate(false);
        console.log("updated");


        const body = bodyRef.current.value;

        let url = `http://localhost:4000/message/update/${updateId}`

        let bodyObject = JSON.stringify({body});

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
            props.fetchMessages();
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }

    }

    // ! Edit Message function-------------------------------------------------------------------------
    return (
        <>
            {/* displaying all messages by mapping through the array */}
            <ul className="message-list">
                {props.messages.map((message) => (
                    <li key={message._id} className="message">
                            
                        <div>{message.user.userName} {message.when}</div>
                        {isUpdate && updateId == message._id ? <Form onSubmit={update}><Input innerRef={bodyRef} defaultValue={message.body}></Input></Form> : <div>{message.body}</div>}

                        {decoded.isAdmin === true || decoded.id === message.user._id ? (
                            <div>
                                <>
                                    {" "}

                                    <Button
                                        color="warning"
                                        onClick={() => {
                                            setIsUpdate(true)
                                            setUpdateId(message._id)
                                            console.log("update")
                                        }}>
                                        Edit
                                    </Button>
                                    <Button onClick={() => deleteMessage(message._id)} color="danger">Delete</Button>
                                </>
                            </div>

                        ) : null}
                    </li>
                ))
                }
            </ul>
        </>
    )
}

export default MessageDisplay
