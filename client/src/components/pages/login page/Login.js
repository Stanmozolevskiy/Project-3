import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'

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
    
    axios({
      method: "post",
      url:"/submit",
      headers:{
        "content-type": "application/json"
      },
      data:{
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        userPassword:this.state.userPassword
      }
    }).then( data => {
     
      this.setState({ show: false });

    })
    
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

          <form >
           
              <label >user name</label>
              <input type="text" value={this.state.userName}  onChange={this.handleInputChange} name="userName" className="form-control"  placeholder="Enter username" />
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" value={this.state.userEmail}  onChange={this.handleInputChange} name="userEmail" className="form-control"  placeholder="Enter email" />
              <label for="exampleInputPassword1">Password</label>
              <input type="password" value={this.state.userPassword}  onChange={this.handleInputChange} name="userPassword" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              
            </form>
            
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