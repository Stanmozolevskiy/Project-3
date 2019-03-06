import React from "react";
import './style.css';
import { Container, Button, Alert } from "react-bootstrap";

function getRanValue () {
  const getFitnessPunishment = ["Donate $20 to your favorite charity", "Take a cold shower for 3 days in a row", ""];
  var rand = getFitnessPunishment[Math.floor(Math.random() * getFitnessPunishment.length)];
  this.setState({rewardButton: rand});
  console.log(rand);
}

class FitnessSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rewardButton: "",
      motivateButton: ""
    }
    // this.getValue = this.getValue.bind(this);
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
