// ! Component that will Display All Rooms---------------------------------------------------

// !Imports -------------------------------------
import React from 'react'
import Room from './Room'
import { useEffect, useState } from "react"


// ! React Component-------------------------------------------------------------
function RoomDisplay(props) {
    const [rooms, setRooms] = useState([]);
    
   
    
    useEffect(() =>  async() => {
      let url = `http://localhost:4000/room/`
      
      let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);
        myHeaders.append("Content-Type", "application/json");
        console.log(props.token)
      
         const requestOptions = {
      headers: myHeaders,
      method: "GET",
         };
      
        try {
      const response = await fetch(url, requestOptions);
            setRooms(await response.json());
    } catch (error) {
      console.log(error.message)
        }
        console.log(rooms)
  }, []);
    
  
  

    return (
        <>
            <Room token={props.token} rooms={rooms} />
            <div>RoomDisplay</div>
            </>
  )
}

export default RoomDisplay