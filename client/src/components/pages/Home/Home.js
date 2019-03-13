import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Image, Modal } from 'react-bootstrap';
import Food from '../foodPage/Contact'
import API from "../../../utils/API";
import "../style.css"
import banner from './image/FitnessFirst.png';


class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    //  Modals handlers
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // 
    this.state = {
      show: false,
      query: "",
      exerciseQuery: "",
      results: [],
      photo: [],
      exercise: [],
      restaurantList: []
    };
  }
  //  Modals generator
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  // 
  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  async searchFood(query) {
    await API.search(query)
      .then(response => {
        this.setState({ results: response.data.hits })
        this.setState({ test: response.data.hits })

        for (let i = 0; i < this.state.test.length; i++) {
          let card = <div className="card-body text-center">
            <h5 className="card-title">{this.state.test[i].fields.food_name}</h5>
            <div className="card-details">
              <h6 className="card-subtitle mb-2 text-muted">Rating: {this.state.test[i].fields.food_name}</h6>
              <p className="card-text">{}</p>
              <a className="btn btn-primary card-detail" data-val={i}>Details</a>
            </div>
          </div>
          this.setState({test2: card})
        }
        console.log(this.state.test1)
      });
    await API.photo(query)
      .then(res => {
        this.setState({ photo: res.data.branded })

      })
  }

  handleFoodSubmit = (event) => {
    event.preventDefault();
    this.searchFood(this.state.query)
  }
  handleExerciseSubmit = (event) => {
    event.preventDefault();
    this.searchExercise(this.state.exerciseQuery)

  }
  async searchExercise(query) {
    await API.exer(query)
      .then(res => {
        this.setState({ exercise: res.data.exercises })
      })

  }

  render() {
    return (
      <div>
        <Container>
          <h2>Welcome to Fitness First. Your one stop, Fitness Workshop </h2>
          <Image src={banner} />
          <Food>
            <form>
              <div className="form-group" id="foodsearch">
                <label htmlFor="exampleInputEmail1" id="searchlabel">Calorie Loss Count Search</label>
                <input type="search" value={this.state.exerciseQuery} placeholder="Enter a exercise" onChange={this.handleInputChange} name="exerciseQuery" className="form-control" />
              </div>
              <div id="foodsearchbutton">
                <Button id="searchbutton" onClick={this.handleExerciseSubmit}>Search</Button>
              </div>
            </form>
            {this.state.exercise.map((each, i) => (
              <div key={i}>
                <div>
                  <ul>
                    <li>{"Calories Burned: " + each.nf_calories} </li>
                  </ul>
                </div>
              </div>
            ))}
            <form>
              <div className="form-group" id="foodsearch">
                <label htmlFor="exampleInputEmail1" id="searchlabel">Calorie Count Search</label>
                <input type="search" value={this.state.query} placeholder="Enter a food name here" onChange={this.handleInputChange} name="query" className="form-control" />
              </div>
              <div id="foodsearchbutton">
                <Button id="searchbutton" onClick={this.handleFoodSubmit}>Search</Button>
              </div>
            </form>
            {this.state.photo.map((each, i) => (
              <div key={i}>
                <div>
                  <ul>
                    <img className="smaller" src={each.photo.thumb} alt="food"></img>
                    <li className="we">{"Food Name: " + each.food_name}</li>
                    <li className="we">{"Brand Name: " + each.brand_name}</li>
                    <li className="we">{"Calories: " + each.nf_calories}</li>
                    <a class="btn btn-primary card-detail" data-val={i} onClick={this.handleShow}>Details </a>
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

export default Home;