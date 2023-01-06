// ! LOGIN -----------------------------------------------------------------------

// ! Imports-------------------------------------------------------------
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import "./Login.css";
import FullWidthButton from "../../Buttons/FullWidthButton";

// ! React Component-----------------------------------------------------------------------

// ? Contants and everything we are passing to the server---------------------------------------------------------------------
const Login = (props) => {
  // constants we need for useRef, for the login we need the email and password
  const emailRef = useRef();
  const passwordRef = useRef();
  // const navigate allows us to navigate to the next page with a succesful login
  const navigate = useNavigate();
  // If there is a Login Error, will be notified
  const [loginError, setLoginError] = useState("");
  const [loginErrorClass, setLoginErrorClass] = useState("none");
  // submit function
  async function handleSubmit(e) {
    e.preventDefault();
    //  will grab the values in the email and password inputs
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // If the email and password areas are not filled in.
    if (email === "" || password === "") {
      setLoginError("missing input");
      setLoginErrorClass("some");
      return;
    }
    // Url for our post to log in
    let url = `http://localhost:4000/user/login`;
    // body we are sending to the server
    let bodyObject = JSON.stringify({ email, password });
    // Sending headers that tell content type
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // complete reques to send to the server
    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    // try where we will await a response from the server
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      // if successful we will update the token and navigate to the home page
      if (data.message === "Success") {
        // We are free to navigate to another page
        props.updateToken(data.token);
        navigate("/home");
      }
      // otherwise we will get an error message
      else {
        alert(data.message);
      }
      // Catch for server errors
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }
  // ?------------------The return, which is what is visible to the client
  return (
    <>
      {/* Our form
      // Has Email, Password and a button, and will call on the function handle submit when submitted via the button. */}
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email: </Label>
          <Input innerRef={emailRef} />
        </FormGroup>

        <FormGroup>
          <Label>Password: </Label>
          <Input type="password" innerRef={passwordRef} />
        </FormGroup>

        <Alert color="danger" className={loginErrorClass}>
          {loginError}
        </Alert>
        {/*Styling to button added to make it full width, wrapping it in the component Full Width button  */}
        <FullWidthButton>
          <Button type="submit" color="primary">
            Login
          </Button>
        </FullWidthButton>
      </Form>
    </>
  );
};

// exporting the login
export default Login;
