import React from "react";
import './style.css';
import { Container, Button, Alert } from "react-bootstrap";

const getFitnessReward = ["Eat out at your favorite restaraunt"];


function getRanValue () {
  const getFitnessPunishment = ["Donate $20 to your favorite charity", "Take a cold shower for 3 days in a row", ""];
  var rand = getFitnessPunishment[Math.floor(Math.random() * getFitnessPunishment.length)];
  console.log(rand);
}

function FitnessSummary() {
  return (
    <div>
      <Container>
        <br />
      <Alert variant="success">
  <Alert.Heading>Fitness Goal Met?</Alert.Heading>
  <p>
    Press the button below for a reward
  </p>
  <p className="mb-0">
  
  <Button variant="primary">Reward</Button>
  </p>
</Alert>
      <Alert dismissible variant="danger">
  <Alert.Heading>Fitness Goal Unmet!</Alert.Heading>
  <p>
    Press the button below to find out what's next...
  </p>
  <Button onClick={getRanValue} variant="primary">Motivation</Button>
    </Alert>
    </Container>
  </div>
  );
}

export default FitnessSummary;
