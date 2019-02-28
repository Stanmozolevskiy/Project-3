import React from "react";
import NavTabs from "../NavTabs"
import { Form, Button } from "react-bootstrap";
import axios from "axios";

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            isFormValid: false
        }
    }
    onFirstNameChange = (e) => {
        e.preventDefault();
        console.log("e " + e);
        console.log("e.target.value: " + e.target.value);
        const value = e.target.value;
        console.log(value);

        this.setState({
            firstName: value
        })

    }

    handleSubmit = (event) => {
        const {firstName} = this.state
        console.log("first name: " + firstName);
        event.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:8081/api/form"

        })

    }

    isFormValid = () => {
        const {firstName} = this.state
        console.log("firstName: " + firstName);
        if (firstName !== "") {
            return false;
        }
        return true
    }

    render() {
        console.log("isFormValid: " + this.isFormValid());
        const {firstName, lastName} = this.state;
        console.log("first name: " + firstName);
        return (
            <div className="container">
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={this.state.firstName} onChange={this.onFirstNameChange} placeholder="Enter First Name"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formLasttName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group>
                    <Button variant="primary" disabled={this.isFormValid()} onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>;
            </div>
        )
    }

}

export default User;
