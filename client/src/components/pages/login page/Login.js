import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
<<<<<<< HEAD:client/src/components/pages/login page/Login.js
=======
import Food from '../foodPage/Contact'
import API from "../../../utils/API";
import "../style.css"
>>>>>>> Orlando:src/components/pages/login page/Login.js

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
<<<<<<< HEAD:client/src/components/pages/login page/Login.js
      userName: "",
      userEmail: "",
      userPassword: "",
=======
>>>>>>> Orlando:src/components/pages/login page/Login.js
      show: true,
      userName: "",
      userPassword: "",
      query: "",
      results: []
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

  async searchFood(query) {
    await API.search(query)
      .then(response => {
        const itemName = response.data.hits[0].fields.item_name
        const brand = response.data.hits[0].fields.brand_name
        const calories = response.data.hits[0].fields.nf_calories
        const servingSize = response.data.hits[0].fields.nf_serving_size_qty
        console.log(response.data.hits[0].fields)
        const data = ("\nName: " + itemName + "\nBrand: " + brand + "\nCalories: " + calories + "\nServing Size: " + servingSize)
        console.log(data)
        this.setState({ results: response.data.hits })
      });
  }
  handleFoodSubmit = (event) => {
    event.preventDefault();
    this.searchFood(this.state.query)

  }
  render() {
    console.log(this.state.results)
    return (
      <>

        <Modal show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Loggin</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" value={this.state.userName} onChange={this.handleInputChange} name="userName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
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
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Food Search</label>
              <input type="search" value={this.state.query} onChange={this.handleInputChange} name="query" className="form-control" />
            </div>
            <button onClick={this.handleFoodSubmit}>Hello World!</button>
          </form>
          {this.state.results.map((each, i) => (
            <div  className="foodContainer">
              <div className="eachName">
              <p className="we" key={i} >{each.fields.item_name}</p>
              </div>
            </div>
            
            
          ))}
        </Food>
      </>
    );
  }
}

export default Login;