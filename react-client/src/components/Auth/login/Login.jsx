import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import './Login.css'
import FullWidthButton from "../../Buttons/FullWidthButton";

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

    const [loginError, setLoginError] = useState("");
    const [loginErrorClass, setLoginErrorClass] = useState("none");

  async function handleSubmit(e) {
    e.preventDefault();
 
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email == "" || password == "") {
        setLoginError("missing input");
        setLoginErrorClass("some");
        return;
    }

    let url = `http://localhost:4000/user/login`;

    let bodyObject = JSON.stringify({email, password });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
       if (data.message === "Success") { 
         // We are free to navigate to another page
        props.updateToken(data.token)
          navigate("/home");
      }
      else {
        alert(data.message);
      }
    } catch (error) {
        console.log(error.message);
        alert(error.message)
    }
  }
  return (
    <>
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
              
        <FullWidthButton>
        <Button type="submit" color="primary">
         Login
          </Button>
          </FullWidthButton>

      </Form>
    </>
  );
};

export default Login;