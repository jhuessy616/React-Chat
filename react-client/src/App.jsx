import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from './components/Auth/Auth' 
import './App.css';

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
        <Route path="/home" element={<h2>Home Section</h2>}/>
      </Routes>
    </div>
  );
}

export default App;
