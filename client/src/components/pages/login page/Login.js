import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      userName: "",
      userEmail: "",
      userPassword: "",
      show: true,
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

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
       
        <Modal show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Loggin</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" value={this.state.userName}  onChange={this.handleInputChange} name="userName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" value={this.state.userPassword}  onChange={this.handleInputChange} name="userPassword" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleFormSubmit}>
              Login
              </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Dissmis
              </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Login;