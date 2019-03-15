import React from 'react';
import 'whatwg-fetch';
import { Form } from "react-bootstrap";
import { getFromStorage, } from '../../utils/storage';
import API from "../../utils/API";
import {Redirect} from 'react-router-dom'


class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpAge: '',
            signupSucsess: false,
            signUpFitnessGoal: '',

        }
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeFirstName = this.onTextboxChangeFirstName.bind(this);
        this.onTextboxChangeLastName = this.onTextboxChangeLastName.bind(this);
        this.onTextboxChangeAge = this.onTextboxChangeAge.bind(this);
        this.onTextboxChangeFitnessGoal = this.onTextboxChangeFitnessGoal.bind(this);

        this.onSignUp = this.onSignUp.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }



    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
    }

    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
    }
    onTextboxChangeFirstName(event) {
        this.setState({
            signUpFirstName: event.target.value,
        });
    }
    onTextboxChangeLastName(event) {
        this.setState({
            signUpLastName: event.target.value,
        });
    }
    onTextboxChangeAge(event) {
        this.setState({
            signUpAge: event.target.value,
        });
    }
    onTextboxChangeFitnessGoal(event) {
        this.setState({
            signUpFitnessGoal: event.target.value,
        });
    }
    onSignUp() {
        // Grab state
        const {
            signUpEmail,
            signUpPassword,
            signUpFirstName,
            signUpLastName,
            signUpAge,
            signUpFitnessGoal,
        } = this.state;
        this.setState({
            isLoading: true,
        });

 
        // Post request to backend
        fetch('/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signUpEmail,
                password: signUpPassword,
                firstName: signUpFirstName,
                lastName: signUpLastName,
                age: signUpAge,
                fitnessGoal: signUpFitnessGoal,
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                        signUpEmail: '',
                        signUpPassword: '',
                        signUpFirstName: '',
                        signUpLastName: '',
                        signUpAge: '',
                        signUpFitnessGoal: '',
                    });

                    API.signIn(signUpPassword, signUpPassword)
                        .then(json => {
                            console.log(json)
                            this.setState({
                                signupSucsess: true
                            })
                        })

                } else {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    logout() {
        this.setState({
            isLoading: true,
        });
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/account/logout?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: '',
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    render() {
        const {
            isLoading,
            token,
            signUpError,
            signUpEmail,
            signUpPassword,
            signUpFirstName,
            signUpLastName,
            signUpAge,
            signUpFitnessGoal,
            signupSucsess
        } = this.state;
        if(signupSucsess){
        return < Redirect to ="/SignIn"/> } 
        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        if (!token) {


            return (
                <div id="profileform">
                    <Form>

                        {(signUpError) ? (<p>{signUpError}</p>) : (null)}
                        <h2>Sign Up</h2>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="yexy" value={signUpFirstName} onChange={this.onTextboxChangeFirstName} placeholder="First Name" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={signUpLastName} onChange={this.onTextboxChangeLastName} placeholder="Last Name" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="age">
                            <Form.Label>Your Age</Form.Label>
                            <Form.Control type="number" value={signUpAge} onChange={this.onTextboxChangeAge} placeholder="Type Your Age" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="fitnessGoal">
                            <Form.Label>Fitness Goal</Form.Label>
                            <Form.Control type="test" value={signUpFitnessGoal} onChange={this.onTextboxChangeFitnessGoal} placeholder="Type Fitnes Goals" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} placeholder="Email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} placeholder="Password" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <br />
                        <button onClick={this.onSignUp}>Sign UP</button>
                        <br />
                    </Form>
                </div>
            )
        }

        return (
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default User;
