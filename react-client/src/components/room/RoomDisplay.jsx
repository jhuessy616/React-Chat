// ! Component that will Display All Rooms---------------------------------------------------

// !Imports -------------------------------------
import React from 'react'
import Room from './Room'
import { useEffect, useState } from "react"


// ! React Component-------------------------------------------------------------
function RoomDisplay(props) {
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
              <h2>{props.room.name}</h2>
                    <h3>{props.room.description}</h3>
                    <Button onClick={() => deleteRoom(room._id)}color="danger">Delete</Button>
          </div>
            ))}
            
        </>
    )
}

export default RoomDisplay