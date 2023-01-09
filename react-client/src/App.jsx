// ! App ----------------------------------------------------------------
// ! Imports----------------------------------------------------------
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import "./App.css";
import RoomIndex from "./components/room/RoomIndex";
import MessageIndex from "./components/message/MessageIndex";
import Profile from "./components/Profile/Profile.jsx"

// ! React Component-----------------------------------------------------------------------
function App() {
  // setting up state for the token so we will be able to pass it and update it
  const [sessionToken, setSessionToken] = useState("");
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(newToken);
  };
  // accessing the token through local storafe
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);
  // ?------------------The return
  // These are all of our different routes.
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/home" element={<RoomIndex token={sessionToken} />} />
        <Route path="/chat/:name/:id" element={<MessageIndex token={sessionToken} />} />
        <Route
          path="/chat/:name/:id"
          element={<MessageIndex token={sessionToken} />}
        />
      </Routes>
    </div>
  );
}

// Exporting app
export default App;
