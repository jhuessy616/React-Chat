// ! SIGNUP -----------------------------------------------------------------------

// ! Imports-------------------------------------------------------------
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import FullWidthButton from "../../Buttons/FullWidthButton";

// ! React Component-----------------------------------------------------------------------
const Signup = (props) => {
  // Constants we need for useref for signup.
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  // const navigate allows us to navigate to the next page with a succesful signup
  const navigate = useNavigate();
  // If there is a Login Error, will be notified
  const [formError, setFormError] = useState("");
  const [formErrorClass, setFormErrorClass] = useState("none");
  // submit function
  async function handleSubmit(e) {
    e.preventDefault();
    //  will grab the values in the inputs
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // Checking that password match
    if (confirmPasswordRef.current.value != password) {
      setFormError("Passwords Don't Match");
      setFormErrorClass("some");
      return;
    } else {
      setFormError("");
      setFormErrorClass("none");
    }
    // if the forms fields are left empty
    if (
      firstName == "" ||
      lastName == "" ||
      userName == "" ||
      email == "" ||
      password == ""
    ) {
      setFormError("missing input");
      setFormErrorClass("some");
      return;
    }
    // Url for our post to signup
    let url = `http://localhost:4000/user/signup`;
    // body we are sending to the server
    let bodyObject = JSON.stringify({
      firstName,
      lastName,
      userName,
      email,
      password,
    });
    // Sending headers that tell content type
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // complete request to send to the server
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
    }
  }
  // ?------------------The return, which is what is visible to the client
  return (
    <>
      {/* Our form
      // Has firstname, lastname, username, email, password, confirm password, an alert that will appear if info is missing and a button, and will call on the function handle submit when submitted via the button. */}
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
          <Input type="email" innerRef={emailRef} />
        </FormGroup>

        <FormGroup>
          <Label>Password: </Label>
          <Input type="password" innerRef={passwordRef} />
        </FormGroup>

        <FormGroup>
          <Label>Confirm Password:</Label>
          <Input type="password" innerRef={confirmPasswordRef} />
        </FormGroup>

        <Alert color="danger" className={formErrorClass}>
          {formError}
        </Alert>

        <FullWidthButton>
          <Button type="submit" color="danger">
            Sign Up
          </Button>
        </FullWidthButton>
      </Form>
    </>
  );
};

// exporting the signup.
export default Signup;
