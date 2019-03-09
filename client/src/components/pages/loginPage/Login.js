import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Image } from 'react-bootstrap';
import Food from '../foodPage/Contact'
import API from "../../../utils/API";
import "../style.css"
import banner from './image/FitnessFirst.png';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: "",
      exerciseQuery: "",
      results: [],
      photo: [],
      exercise: []
    };
  }

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
                    {console.log(each)}
                    <img className="smaller" src={each.photo.thumb} alt="food"></img>
                    <li className="we">{"Food Name: " + each.food_name}</li>
                    <li className="we">{"Brand Name: " + each.brand_name}</li>
                    <li className="we">{"Calories: " + each.nf_calories}</li>
                  </ul>
                </div>
              </div>
            ))}
            {/* {this.state.results.map((each, i) => (
              <Card id="fooddata">
                <div className="foodContainer">
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
            ))} */}
          </Food>
        </Container>
      </div>
    );
  }
}

export default Login;