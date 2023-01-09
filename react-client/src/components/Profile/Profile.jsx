import {Button, Row, Col, Container, Form, Input, Label} from "reactstrap";
import './Profile.css';
import {useRef, useEffect, useState} from "react";


export default function Profile(props) {

    async function getUser() {
        const url = `http://localhost:4000/user/me/`

        let headers = new Headers();
        headers.append("Authorization", props.token);


        const reqOpt = {
            method: "GET",
            headers: headers,
        }

        try {
            const response = await fetch(url, reqOpt);
            const data = await response.json();
            setUser(data.user)

            setFirstName(data.user.firstName)
            setLastName(data.user.lastName)
            setUserName(data.user.userName)
            setEmail(data.user.email)
            console.log("data", data, "firstname", firstName);
        } catch (error) {
            console.log(error.message);
        }

    }


    useEffect(() => {
        if (props.token) {
            getUser()
        }
    }, [props.token]);

    const [user, setUser] = useState("");

    const [firstName, setFirstName] = useState(user.firstName);

    const [lastName, setLastName] = useState(user.lastName);
    const [userName, setUserName] = useState(user.userName);
    const [email, setEmail] = useState(user.email);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cPasswordRef = useRef();



    async function update(e) {
        e.preventDefault();
        setFirstName(firstNameRef.current.value);
        setLastName(lastNameRef.current.value);
        setUserName(userNameRef.current.value);
        setEmail(emailRef.current.value);
        const password = passwordRef.current.value;
        const cpassword = cPasswordRef.current.value;

        if (password != cpassword) {
            console.log("passwords do not match")
            return;
        }
        

        console.log(password, cpassword);

        const url = `http://localhost:4000/user/update/`

        let headers = new Headers();
        headers.append("Authorization", props.token);
        headers.append("Content-Type", "application/json")

        const body = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password
        });


        const reqOpt = {
            method: "PATCH",
            headers: headers,
            body: body,
        }

        try {
            const response = await fetch(url, reqOpt);
            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function deleteUser() {
        const url = `http://localhost:4000/user/delete/`

        let headers = new Headers();
        headers.append("Authorization", props.token);


        const reqOpt = {
            method: "DELETE",
            headers: headers,
        }

        try {
            const response = await fetch(url, reqOpt);
            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Welcom {user.userName}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Delete User</h3>
                        <Button color="danger" onClick={deleteUser}>Delete User</Button>
                    </Col>
                    <Col>
                        <h3>Update User</h3>
                        <Form onSubmit={update} className="form">
                            <Label>First Name</Label>
                            <Input defaultValue={firstName} innerRef={firstNameRef}/>
                            <Label>Last Name</Label>
                            <Input defaultValue={lastName} innerRef={lastNameRef}/>
                            <Label>UserName</Label>
                            <Input defaultValue={userName} innerRef={userNameRef}/>
                            <Label>Email</Label>
                            <Input defaultValue={email} innerRef={emailRef}/>
                            <Label>Password</Label>
                            <Input innerRef={passwordRef}/>
                            <Label>Confirm Password</Label>
                            <Input innerRef={cPasswordRef}/>
                            <Button color="warning">Update User</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
