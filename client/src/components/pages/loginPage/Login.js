import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Card, Container, Image} from 'react-bootstrap';
import Food from '../foodPage/Contact'
import API from "../../../utils/API";
import "../style.css"
import banner from './image/FitnessFirst.png';

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
      <div>
        {/* <Modal show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
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
              Dismiss
              </Button>
          </Modal.Footer>
        </Modal> */}
        <Container>
          <h2>Welcome to Fitness First. Your one stop, Fitness Workshop </h2>
          <Image src={banner} />
            {/* <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={banner}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3></h3>
      <p></p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel> */}
        <Food>
          <form>
            <div className="form-group" id="foodsearch">
              <label htmlFor="exampleInputEmail1" id="searchlabel">Calorie Count Search</label>
              <input type="search" value={this.state.query} placeholder="Enter a food name here" onChange={this.handleInputChange} name="query" className="form-control" />
            </div>
            <div id="foodsearchbutton">
            <Button id="searchbutton" onClick={this.handleFoodSubmit}>Search</Button>
            </div>
          </form>
          {this.state.results.map((each, i) => (
            <Card id="fooddata">
            <div  className="foodContainer">
              <div className="eachName">
              <ul>
                <li className="we" key={i} >{"Food: " + each.fields.item_name}</li>
                <li className="we" key={i} >{"Brand: " + each.fields.brand_name}</li>
                <li className="we" key={i} >{"Calories: " + each.fields.nf_calories}</li>
                <li className="we" key={i} >{"Serving Size: " + each.fields.nf_serving_size_qty}</li>
              </ul>
              </div>
            </div>
            </Card>
            
            
          ))}
        </Food>
        </Container>
      </div>
    );
  }
}

export default Login;