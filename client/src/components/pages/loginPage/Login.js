import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Container, Image } from 'react-bootstrap';
// import Carousel from 'react-bootstrap/Carousel'
// import Modal from 'react-bootstrap/Modal';
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
      results: [],
      photo: []
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
        const data = ("\nName: " + itemName + "\nBrand: " + brand + "\nCalories: " + calories + "\nServing Size: " + servingSize)
        console.log(data)
        this.setState({ results: response.data.hits })
      });
  }
  async searchFoodPhoto(query) {
    const axios = require('axios');
    await axios.get('https://trackapi.nutritionix.com/v2/search/instant?query=' + query, {
      headers: {
        "x-app-id": "4fd1d55d",
        "x-app-key": "9788c6b183e3995fbc144d4b1b300850"
      }
    }).then(res => {
      const brand = res.data.branded[0].brand_name_item_name
      const itemName = res.data.branded[0].food_name
      const calories = res.data.branded[0].nf_calories
      console.log("\nName: " + itemName + "\nBrand: " + brand + "\nCalories: " + calories)
      this.setState({ photo: res.data.branded })
    })
  }
  handleFoodSubmit = (event) => {
    event.preventDefault();
    this.searchFood(this.state.query)
    this.searchFoodPhoto(this.state.query)

  }
  render() {
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
          <h2>Welcome to Fitness First. Your one stop, Fitness Shop </h2>
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
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Calorie Count Search</label>
                <input type="search" value={this.state.query} onChange={this.handleInputChange} name="query" className="form-control" />
              </div>
              <Button variant="primary" onClick={this.handleFoodSubmit}>Search</Button>
            </form>
            {this.state.photo.map((each, i) => (
              <div key={i}>
                <div>
                  <ul >
                    {/* <li key={i}>{"Photo: " + console.log(each.photo.thumb)}</li> */}
                    <img src={each.photo.thumb} className="smaller"/>
                    <li className="we">{"Food: " + each.food_name}</li>
                    <li className="we">{"Brand: " + each.brand_name}</li>
                    <li className="we">{"Calories: " + each.nf_calories}</li>
                  </ul>
                </div>
              </div>
            ))}
            {this.state.results.map((each, i) => (
              <div className="foodContainer" key={i}>
                <div className="eachName">
                  <ul >
                    <li className="we">{"Food: " + each.fields.item_name}</li>
                    <li className="we">{"Brand: " + each.fields.brand_name}</li>
                    <li className="we">{"Calories: " + each.fields.nf_calories}</li>
                    <li className="we">{"Serving Size: " + each.fields.nf_serving_size_qty}</li>
                  </ul>
                </div>
              </div>


            ))}
          </Food>
        </Container>
      </div>
    );
  }
}

export default Login;