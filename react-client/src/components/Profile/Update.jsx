import {Label, Form} from 'reactstrap'

export default function Update(props) {
    return (
        <>
        <Form className="form">
            <Label>{props.label}</Label>
            <Input/>
            <Button>{props.button}</Button>
        </Form>
        </>
    );
}
