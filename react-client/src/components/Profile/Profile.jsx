import {Button, Row, Col, Container, Form, Input, Label} from "reactstrap"
import './Profile.css'


export default function Profile() {

    function update() {

    }

    const user = "jonas";
    return (
        <>
            <Container>
                <Row>
                    <Col >
                        <h1>hello {user}</h1>
                        <Form className="form">
                            <Label>Update First Name</Label>
                            <Input/>
                            <Button>Update First Name</Button>
                        </Form>
                        <Form className="form">
                            <Label>Update Last Name</Label>
                            <Input/>
                            <Button>Update Last Name</Button>
                        </Form>
                        <Form className="form">
                            <Label>Update UserName</Label>
                            <Input/>
                            <Button>Update UserName</Button>
                        </Form>
                        <Form className="form">
                            <Label>Update Email</Label>
                            <Input/>
                            <Button>Update Email</Button>
                        </Form>
                        <Form className="form">
                            <Label>Update Password</Label>
                            <Input/>
                            <Label>Confirm Password</Label>
                            <Input/>
                            <Button>Update Password</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
