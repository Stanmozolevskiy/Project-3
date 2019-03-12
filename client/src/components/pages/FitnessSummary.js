import React from "react";
import './style.css';
import { Container, Button, Alert } from "react-bootstrap";
import {Bar, Line, Pie} from 'react-chartjs-2';
import exercise from "../exercise.json";
import axios from 'axios';
class FitnessSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      rewardButton: "",
      motivateButton: ""
    }
    // this.getValue = this.getValue.bind(this);
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      //axios.get('/api/tables)
          // .then(res =>
          //   this.setState({ chartData: res.data})
          // )
          // .catch(err => console.log(err));
      //};
      //})
      //ajax call here
      chartData: {
        labels: ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Calories Burned',
            data: [
              355, 65, 215, 325, 465, 550, 175
            ],
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
  }

  getMotivateValue =  () => {
    const getFitnessPunishment = ["Donate $20 to your favorite charity", "Take a cold shower for 3 days in a row", "Do as many push ups as you can", "Eat only chicken and vegetables for the next week", "Run backwards on the treadmill for 10 minutes"];
    var rand = getFitnessPunishment[Math.floor(Math.random() * getFitnessPunishment.length)];
    this.setState({motivateButton: rand});
    console.log('rand: ' + rand);

  }

  getRewardValue =  () => {
    const getFitnessReward = ["Eat out at your favorite restaraunt", "Binge watch a show on Netflix", "Buy a new outfit", "Relax in the hot tub", "Plan a hike or an adventure with friends"];
    var rand = getFitnessReward[Math.floor(Math.random() * getFitnessReward.length)];
    this.setState({rewardButton: rand});
    console.log('rand: ' + rand);

  }
 
render() {
  return (
    <div>
      <Container>
        <br />
        <div className="chart">
          <Bar
            data={this.state.chartData}
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
            }}
          /> <br /> <br />
          <Line
            data={this.state.chartData}
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
            }}
          />

        </div>
      <Alert dismissible variant="success">
  <Alert.Heading>Fitness Goal Met?</Alert.Heading>
  <p>
    Press the button below for a reward
  </p>
  <p className="mb-0">

  
  <Button onClick={this.getRewardValue} variant="primary">Reward</Button> 
  <br />
  <h4> {this.state.rewardButton} </h4>

  </p>
</Alert>
      <Alert dismissible variant="danger">
  <Alert.Heading>Fitness Goal Unmet!</Alert.Heading>
  <p>
    Press the button below to find out what's next...
  </p>
  <Button onClick={this.getMotivateValue} variant="primary">Motivation</Button>
  <br />
  <h4>{this.state.motivateButton} </h4>
    </Alert>
    </Container>
  </div>
  );
}
}

export default FitnessSummary;
