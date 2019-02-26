import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Food from '../foodPage/Contact'

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      userName: "",
      userPassword: "",
      search: "Steak"
    };

    this.state = {
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
  food = any => {
    const axios = require('axios');
    require('dotenv').config();
    const id = "4fd1d55d"
    const key = "9788c6b183e3995fbc144d4b1b300850"
    any = this.setState(this.state.search)
    console.log(any)
    axios.get("https://api.nutritionix.com/v1_1/search/" + any + "?results=0:10&fields=item_name,brand_name,nf_calories&appId=" + id + "&appKey=" + key)
      .then(response => {
        const itemName = response.data.hits[0].fields.item_name
        const brand = response.data.hits[0].fields.brand_name
        const calories = response.data.hits[0].fields.nf_calories
        const servingSize = response.data.hits[0].fields.nf_serving_size_qty
        console.log(Object.entries(response.data.hits))
        console.log("\nName: " + itemName + "\nBrand: " + brand + "\nCalories: " + calories + "\nServing Size: " + servingSize)
      });
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
              <input type="email" value={this.state.userName} onChange={this.handleInputChange} name="userName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" value={this.state.userPassword} onChange={this.handleInputChange} name="userPassword" className="form-control" id="exampleInputPassword1" placeholder="Password" />
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
        <Food>
          <button onClick={this.food}>Hello World!</button>

        </Food>
      </>
    );
  }
}

export default Login;