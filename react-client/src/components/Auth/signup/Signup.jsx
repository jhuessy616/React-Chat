import React, { useRef } from "react";

import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const Signup = () => {
  const firstNameRef = useRef();
    const lastNameRef = useRef();
    const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
 
    const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let url = `http://localhost:4000/user/signup`;

    let bodyObject = JSON.stringify({ firstName, lastName, userName, email, password });

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
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First Name: </Label>
          <Input innerRef={firstNameRef} />
              </FormGroup>
              
              <FormGroup>
          <Label>Last Name: </Label>
          <Input innerRef={lastNameRef} />
              </FormGroup>

               <FormGroup>
          <Label>Username: </Label>
          <Input innerRef={userNameRef} />
              </FormGroup>
              
        <FormGroup>
          <Label>Email: </Label>
          <Input innerRef={emailRef} />
        </FormGroup>

        <FormGroup>
          <Label>Password: </Label>
          <Input type="password" innerRef={passwordRef} />
              </FormGroup>
              
        <Button type="submit" color="danger">
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default Signup;