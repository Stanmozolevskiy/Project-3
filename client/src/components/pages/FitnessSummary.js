import React from "react";
import './style.css';
import { Container, Button, Alert } from "react-bootstrap";
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
class FitnessSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodChartDates: [],
      foodChartCalories: [],
      exerciseChartDates: [],
      exerciseChartCalories: [],
      rewardButton: "",
      motivateButton: ""
    }
  }
  //add data to the screen upon page load (if the user has entered before)
  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    // this.setState({
    axios
      .get('/api/data')
      .then(res => {
        // this.setState({ chartData: res.data}, console.log(res)),
        console.log(res);
        const exercises = [];
        const foods = [];
        for (let i = 0; i < res.data.length; i++) {
          //if res has value exercise push the object into exercise
          if (res.data[i]["exercise"]) {
            exercises.push(res.data[i] //else push to the food array
            );
          } else {
            foods.push(res.data[i]);
          }
        }
        console.log(exercises, foods); // take the object coming back from mongo and turn the dates into an array based on entries
        const exerciseDates = exercises.map(exercise => {
          return exercise.date
        })
        console.log(exerciseDates); //take the object coming back from mongo and turn the calories burned into an array based on entries
        const caloriesBurned = exercises.map(exercise => {
          return exercise.caloriesBurned
        })
        console.log(caloriesBurned); //take the object coming back from mongo and turn the dates in food table into an array based on entries        
        const foodDates = foods.map(food => {
          return food.date
        })
        console.log(foodDates); //take the object coming back from mongo and turn the calories consumed into an array based on entries        
        const foodConsumed = foods.map(food => {
          return food.caloriesConsumed
        })
        console.log(foodConsumed);
        // add the arrays above into the bar and line charts
        this.setState({

          exerciseData: {
            labels: exerciseDates,
            datasets: [
              {
                label: 'Calories Burned',
                data: caloriesBurned,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]

              }
            ]

          },

          foodData: {
            labels: foodDates,
            datasets: [
              {
                label: 'Calories Consumed',
                data: foodConsumed,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]

              }
            ]

          }
        })
      })
      .catch(err => console.log(err))
    // })
    console
      .log(this.state.foodChartDates);
  }


  //function to randomize rewards for meeting fitness goal
  getMotivateValue = () => {
    const getFitnessPunishment = ["Donate $20 to your favorite charity", "Take a cold shower for 3 days in a row", "Do as many push ups as you can", "Eat only chicken and vegetables for the next week", "Run backwards on the treadmill for 10 minutes"];
    var rand = getFitnessPunishment[Math.floor(Math.random() * getFitnessPunishment.length)];
    this.setState({ motivateButton: rand });
    console.log('rand: ' + rand);

  }

  //function to randomize penalties for missing fitness goal
  getRewardValue = () => {
    const getFitnessReward = ["Eat out at your favorite restaraunt", "Binge watch a show on Netflix", "Buy a new outfit", "Relax in the hot tub", "Plan a hike or an adventure with friends"];
    var rand = getFitnessReward[Math.floor(Math.random() * getFitnessReward.length)];
    this.setState({ rewardButton: rand });
    console.log('rand: ' + rand);

  }

  render() {
    return (
      <div>
        <Container>
          <br />
          <div className="chart">
            <Bar
              data={this.state.exerciseData}
              options={{
                title: {
                  display: true,
                  text: "Daily Workout Calories Burned",
                  fontSize: 25
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }} />
            <br />
            <br />
            <Line
              data={this.state.foodData}
              options={{
                title: {
                  display: true,
                  text: "Daily Calories Consumed",
                  fontSize: 25,
                  label: 'Calories Consumed'
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }} />

          </div>
          <Alert dismissible variant="success">
            <Alert.Heading>Fitness Goal Met?</Alert.Heading>
            <p>
              Press the button below for a reward
            </p>
            <p className="mb-0">

              <Button
                className="btn-outline-secondary"
                onClick={this.getRewardValue}
                id="genericbutton">Reward</Button>
              <br />
              <h4>
                {this.state.rewardButton}
              </h4>

            </p>
          </Alert>
          <Alert dismissible variant="danger">
            <Alert.Heading>Fitness Goal Unmet!</Alert.Heading>
            <p>
              Press the button below to find out what's next...
            </p>
            <Button
              className="btn-outline-secondary"
              onClick={this.getMotivateValue}
              id="genericbutton">Motivation</Button>
            <br />
            <h4>{this.state.motivateButton}
            </h4>
          </Alert>
        </Container>
      </div>
    );
  }
}

export default FitnessSummary;
