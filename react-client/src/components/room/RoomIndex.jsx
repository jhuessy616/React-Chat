// ! Room Index ----------------------------------------------------------------

// !Imports Section -------------------------------------------------------------
import RoomCreate from "./RoomCreate";
import { Col, Container, Row } from "reactstrap";
import "./room.css";
import RoomDisplay from "./RoomDisplay";
import RoomEdit from "./RoomEdit.jsx";
import { useEffect, useState } from "react";

// ! React Component -------------------------------------------------------------
// ? Constants and everything we are passing to the server---------------------------------------------------------------------
function RoomIndex(props) {
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState("");

  // Setting up state so we can edit/update the rooms.
  const [rooms, setRooms] = useState([]);
  // Fetching all rooms from our database so we will be able to access and display them in createRoom and displayRoom.
  const fetchRooms = async () => {
    //   everything we need to send to the database being stored in variables
    const url = `http://localhost:4000/room/`;
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
      setRooms(data.allRooms);
    } catch (err) {
      console.log(err.message);
    }
  };
  // Useeffect to call on our async function of fetch rooms. Important token is there or it will fire before the token has loaded and will return an empty array.
  useEffect(() => {
    if (props.token) {
      fetchRooms();
    }
  }, [props.token]);

  // ?------------------The return, which is what is visible to the client
  return (
    <>
      {/* contains a create area and a display area, create will use 1/3 of the screen and the display will take up the other 2/3rds */}
      <div className="roombackground border d-flex align-items-center justify-content-center">
        <Container className="roomcontainer">
          <h1>Select a Room or Create a Room</h1>
          <Row>
            <Col md="5">
              {updateMode ? (
                <RoomEdit
                  updateId={updateId}
                  setUpdateMode={setUpdateMode}
                  token={props.token}
                  fetchRooms={fetchRooms}
                />
              ) : (
                <RoomCreate token={props.token} fetchRooms={fetchRooms} />
              )}
            </Col>
            <Col md="1"></Col>
            <Col md="6">
              <RoomDisplay
                setUpdateId={setUpdateId}
                setUpdateMode={setUpdateMode}
                token={props.token}
                rooms={rooms}
                fetchRooms={fetchRooms}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

// exporting the RoomIndex
export default RoomIndex;
