import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from './components/Auth/Auth' 
import './App.css';
import RoomIndex from "./components/room/RoomIndex";
import RoomEdit from "./components/room/RoomEdit";

function App() {
    const [sessionToken, setSessionToken] = useState("");
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
    console.log(newToken)
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, []);

  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/home" element={<RoomIndex token={sessionToken} />} />
         <Route path="/roomedit/:id" element={<RoomEdit token={sessionToken} />} />
      </Routes>
    </div>
  );
}

export default App;
