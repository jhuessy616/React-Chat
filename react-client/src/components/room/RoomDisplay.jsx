// ! Component that will Display All Rooms---------------------------------------------------

// !Imports -------------------------------------
import React from 'react'
import Room from './Room'
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import './room.css'


// ! React Component-------------------------------------------------------------
function RoomDisplay(props) {
    console.log(props);
    const decoded = props.token ? jwt_decode(props.token) : "";
    const navigate = useNavigate();

    // ! Delete room function ----------------------------------------------------------------
    async function deleteRoom(id) {
        const url = `http://localhost:4000/room/delete/${id}`;

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
            props.fetchRooms()
            if (data.message === "Room was deleted") {
            }
            else {
                alert(data.message)
            }
        } catch (err) {
            console.log(err);
        }
    }

    // ! Edit Room function-------------------------------------------------------------------------
    return (
        <>
            {/* displaying all rooms by mapping through the array */}
            <h2>Select a Room</h2>
            {props.rooms.map((room) => (
                <div key= {room._id} className="room">
              <h3>{room.name}</h3>
                    <p>{room.description}</p>
                     <Button
                  color="primary"
                  onClick={() => navigate(`/room/${room._id}`)}>
               Join
                    </Button>

                    {decoded.isAdmin === true ? (
                        <>
                            {" "}
                            <Button
                  color="warning"
                  onClick={() => {
                      props.setUpdateMode(true)
                      props.setUpdateId(room._id)
                      console.log(room._id)
                  }}>
               Edit
                </Button>
                            <Button onClick={() => deleteRoom(room._id)} color="danger">Delete</Button>
                        </>
                    ) : null}
          </div>
            ))}
            
        </>
    )
}

export default RoomDisplay
