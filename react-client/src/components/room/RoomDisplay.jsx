// ! Component that will Display All Rooms---------------------------------------------------

// !Imports -------------------------------------
import React from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "./room.css";

// ! React Component-------------------------------------------------------------
function RoomDisplay(props) {
  console.log(props);
  const decoded = props.token ? jwt_decode(props.token) : "";
  const navigate = useNavigate();

  // ! Delete room function ----------------------------------------------------------------
  async function deleteRoom(id) {
    const url = `http://localhost:4000/room/delete/${id}`;
    // Sending headers that will pass the Authorization token
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    // complete request to send to the server
    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };
    // try where we will await a response from the server and delete one room
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      console.log(data);
      // if successfully updated, we need to fetch the messages again so we no longer display the deleted room
      props.fetchRooms();
      // if successful will continue on it's merry way though the code
      if (data.message === "Room was deleted") {
      }
      // if unsuccessful an alert will show the message as to why it wasn't deleted.
      else {
        alert(data.message);
      }
      // Catch for server errors
    } catch (err) {
      console.log(err);
    }
  }

  // ?------------------The return, which is what is visible to the client
  return (
    <>
      {/* displaying all rooms by mapping through the array */}
      <h2 className="roomDisplay">Select a Room</h2>
      <div className="roomDisplay">
        {props.rooms.map((room) => (
          <div key={room._id} className="room">
            {/* Displaying the room name and description */}
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            {/* How to join a room, this button will navigate to the chat room */}
            <Button
              style={{ backgroundColor: "rgb(187,8,11)" }}
              onClick={() => navigate(`/chat/${room.name}/${room._id}`)}
            >
              Join
            </Button>

            {/* Buttons for Update and delete, only visible to admins */}
            {decoded.isAdmin === true ? (
              <>
                {" "}
                <Button
                  color="warning"
                  onClick={() => {
                    props.setUpdateMode(true);
                    props.setUpdateId(room._id);
                    console.log(room._id);
                  }}
                >
                  Edit
                </Button>
                <Button onClick={() => deleteRoom(room._id)} color="danger">
                  Delete
                </Button>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

// export roomdisplay
export default RoomDisplay;
