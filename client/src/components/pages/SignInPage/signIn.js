import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import "../style.css"

class SignIn extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userName: "",
            userPassword: "",
        };
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {

        this.setState({ show: false });

        console.log(`${this.state.userName} ${this.state.userPassword}`);
        this.setState({
            userName: "",
            userPassword: ""
        });
        
    };

    render() {
        return (
            <div>
                <h1 className="text-center">Sign In</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={this.state.userName} onChange={this.handleInputChange} name="userName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Example@example.com" />
                    <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={this.state.userPassword} onChange={this.handleInputChange} name="userPassword" className="form-control" id="exampleInputPassword1" placeholder="Secret123" />
                </div>

                <Button variant="primary" onClick={this.handleFormSubmit}>
                    Login
                </Button>
            </div>
        )

    }
}

export default SignIn;