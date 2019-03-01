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

        const sendData = {
            firstName : this.state.firstName,
            lastName: this.state.lastName 
        }
        axios({
            method: "POST",
            url: "/api/submit",
            data: sendData

        })
        .then(data => {
            console.log(data);
            console.log(data.config.data);
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
            <div>{ <NavTabs/> }
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={this.state.firstName} onChange={this.onFirstNameChange} placeholder="Enter First Name"/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formLasttName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={this.state.lastName} onChange={this.onlastNameChange} placeholder="Enter Last Name"/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group controlId="FitnessBox">
                    <Form.Label>Fitness Goal</Form.Label>
                    <Form.Control as="textarea" rows="5" />
                    </Form.Group>
                    <Button variant="primary" disabled={this.isFormValid()} onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }

}

export default User;
