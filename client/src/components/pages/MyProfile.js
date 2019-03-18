import React from 'react';
import 'whatwg-fetch';
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { getFromStorage, } from '../../utils/storage';
import API from "../../utils/API";
import { Redirect } from 'react-router-dom'

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
            signUpFitnessGoal: ''
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
        if (signupSucsess) {
            return < Redirect to="/SignIn" />
        }
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
                            <Form.Control type="test" value={signUpFitnessGoal} onChange={this.onTextboxChangeFitnessGoal} placeholder="Type Fitness Goals" />
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
                        <Button variant="light" onClick={this.onSignUp}>Sign Up</Button>
                        <br />
                    </Form>
                </div>
            )
        }

        return (
            <Container>
                <div>
                    <h1>Thank you for signing up for Fitness First!</h1>
                    <br />
                    <h2>About the site </h2>
                    <Row>
                        <Col>
                            <p>Fitness first is designed to be a simple, easy to use web application, to help users stay on track and achieve their fitness goals</p>
                        </Col>
                    </Row>
                    <h3>Home </h3>
                    <Row>
                        <Col>
                            <Image src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2853&q=80" fluid />

                        </Col>
                        <Col>
                            <p>The app features a home button in the top left hand corner. Within home, the user can enter in the exercise and duration of activity. This easy to use
                                search box will then return the estimated calories burned from the physical activity. Listed below, is another search box where the user can enter in
                    any meal or snack they cosumed throughout the day. A listing of cards will appear with information of the food such as calories, manufacturer and serving size. </p>
                        </Col>
                    </Row>
                    <br />
                    <h3>Fitness Log </h3>
                    <Row>
                        <Col>
                            <Image src="https://images.unsplash.com/1/irish-hands.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" fluid />
                        </Col>
                        <Col>
                            <p>The fitness log page features two tables. One for keeping track of the exercises you complete on a day to day basis. The other table is designed to monitor each meal
                                of the day based on your total calorie consumption. The results the user searches for on the home page can be used within either log.
                </p>
                        </Col>
                    </Row>
                    <br />
                    <h3>Fitness Summary </h3>
                    <Row>
                        <Col>
                            <Image src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" fluid />
                        </Col>
                        <Col><p>Last but not least is the fitness summary page. This page is designed to give the user an easy to depict graph of their progress. As the user adds, deletes or updates rows from the tables, the charts will adjust accordingly.</p> </Col>
                    </Row>
                    <br />
                    <br />
                    {/* <Button variant="light" onClick={this.logout}>Logout</Button> */}
                </div>
            </Container>
        );
    }
}

export default User;
