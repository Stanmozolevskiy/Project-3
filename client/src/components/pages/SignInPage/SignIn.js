import { getFromStorage, setInStorage, } from '../../../utils/storage';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import "../style.css"

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
        };
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
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
    onTextboxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        });
    }

    onTextboxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        });
    }
    onSignIn() {
        // Grab state
        const {
            signInEmail,
            signInPassword,
        } = this.state;

        this.setState({
            isLoading: true,
        });

        // Post request to backend
        fetch('/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    setInStorage('the_main_app', { token: json.token });
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInPassword: '',
                        signInEmail: '',
                        token: json.token,
                    });
                } else {
                    this.setState({
                        signInError: json.message,
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
            signInError,
            signInEmail,
            signInPassword,
        } = this.state;
        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        if (!token) {

            return (
                <div>
                    <Form>
                        {(signInError) ? (<p>{signInError}</p>) : (null)}
                        <p>Sign In</p>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>Enail</Form.Label>
                            <Form.Control type="email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail} placeholder="Email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formLasttName">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="text" value={signInPassword} onChange={this.onTextboxChangeSignInPassword} placeholder="password" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <br />
                        <button onClick={this.onSignIn}>Sign In</button>
                        <br />
                    </Form>
                </div>
            )
        }

        return (
            <div>
              <p>Welcome: Bring the Name of the user here</p>
              <button onClick={this.logout}>Logout</button>
            </div>
          );
        }
      }

export default SignIn;
