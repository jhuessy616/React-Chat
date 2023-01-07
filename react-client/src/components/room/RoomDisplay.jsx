// ! Component that will Display All Rooms---------------------------------------------------

// !Imports -------------------------------------
import React from 'react'
import Room from './Room'
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";


// ! React Component-------------------------------------------------------------
function RoomDisplay(props) {
    console.log(props);
   const decoded = props.token ? jwt_decode(props.token) : "";
    const navigate = useNavigate();

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
    return (
        <>
            {/* displaying all rooms by maping through the array */}
            <h1>Select a Room</h1>
            {props.rooms.map((room) => (
                <div key= {room._id} className="room">
              <h2>{room.name}</h2>
                    <p>{room.description}</p>
                     <Button
                  color="primary"
                  onClick={() => navigate(`/room/${room._id}`)}>
               Join
                    </Button>

                    {decoded.isAdmin === true ? (
                        <>
                            {" "}
                            {/* <Button
                  color="warning"
                  onClick={() => editRoom(room._id)}>
               Edit
                </Button> */}
                            <Button onClick={() => deleteRoom(room._id)} color="danger">Delete</Button>
                        </>
                    ) : null}
          </div>
            ))}
            
        </>
    )
}

export default RoomDisplay