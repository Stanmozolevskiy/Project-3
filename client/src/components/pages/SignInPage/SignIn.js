import { getFromStorage, setInStorage, } from '../../../utils/storage';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Card } from 'react-bootstrap';
import "../style.css"
import API from "../../../utils/API";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
            user: {},

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
                    // !! call for the user's profile data
                    API.getUser(json.userId)
                        .then(res => this.setState({ user: res.data }))
                        .catch(err => console.log(err));
                    //!!
                    console.log(json)
                });

            console.log('loaded')
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
    // onSignIn() {
    //     // Grab state
    //     const {
    //         signInEmail,
    //         signInPassword,
    //     } = this.state;

    //     this.setState({
    //         isLoading: true,
    //     });

    //     // Post request to backend
    //     fetch('/api/account/signin', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email: signInEmail,
    //             password: signInPassword,
    //         }),
    //     }).then(res => res.json())
    //         .then(json => {
    //             if (json.success) {
    //                 // !! call for the user's profile data
    //                 API.getUser(json.userId)
    //                     .then(res => this.setState({ user: res.data }))
    //                     .catch(err => console.log(err));
    //                 //!!
    //                 setInStorage('the_main_app', { token: json.token });
    //                 this.setState({
    //                     signInError: json.message,
    //                     isLoading: false,
    //                     signInPassword: '',
    //                     signInEmail: '',
    //                     token: json.token,
    //                 });
    //             } else {
    //                 this.setState({
    //                     signInError: json.message,
    //                     isLoading: false,
    //                 });
    //             }
    //         });
    // }
    onSignIn() {
        const {
            signInEmail,
            signInPassword,
        } = this.state;

        this.setState({
            isLoading: true,
        });
         API.signIn(signInEmail,signInPassword).then(json =>{
             console.log(json)
             this.setState({
                isLoading: false,
                ...json
            });
         })
         
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
                <div id="signinform">
                    <Form>
                        {(signInError) ? (<p>{signInError}</p>) : (null)}
                        <h2>Sign In</h2>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail} placeholder="Email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formLasttName">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword} placeholder="password" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <br />

                        <Button variant="light"  onClick={this.onSignIn}>Sign In</Button>
                        <br />

                    </Form>
                </div>
            )
        }

        return (
            <Container>
                <br /><br />
                <Row className="justify-content-md-center">

                <Card style={{ width: '18rem' }}>
                    
                        <Card.Body>
                            <Card.Title className="justify-content-md-center">My Profile</Card.Title>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1542974242-cde14af34396?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80/100px180" />  
                                <Card.Text>
                                {this.state.user.firstName + " " + this.state.user.lastName}
                                <br />
                                {"Fitness Goal: " + this.state.user.fitnessGoal}
                                </Card.Text>
                        </Card.Body>
                </Card>
                </Row>
                <br />
                <Row className="justify-content-md-center">
                <Button  variant="light" onClick={this.logout}>Logout</Button>
                </Row>
            </Container>
        );
    }
}

export default SignIn;
