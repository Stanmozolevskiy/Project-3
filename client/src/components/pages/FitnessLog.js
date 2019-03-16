import React from "react";
import {Table, Image, Container, Row, Col } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import exercise from "../exercise";
import food from "../food";
import fitnessLogcss from "./FitnessLog/fitnessLog.css";
import axios from 'axios';

// console.log(exercise);
// or in ECMAScript 5
// import ReactBSTable from 'react-bootstrap-table';  
// var BootstrapTable = ReactBSTable.BootstrapTable;
// var TableHeaderColumn = ReactBSTable.TableHeaderColumn;
//test

// validator function pass the user input value and row object. In addition, a bool return value is expected
function jobNameValidator(value, row) {
  const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
  if (!value) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must be inserted';
    response.notification.title = 'Requested Value';
  } else if (value.length < 1) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must have 1 characters';
    response.notification.title = 'Invalid Value';
  }
  return response;
}

function jobStatusValidator(value, row) {
  const nan = isNaN(parseInt(value, 10));
  if (nan) {
    return 'Job Status must be a integer!';
  }
  return true;
}

class EditTypeTable extends React.Component {
  //set the properties of the cells to save after the user hits the save button
  cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: this.cellEdit
  };

  state = {
    exercise: [], //exercise
    food: [] //food
  }

componentDidMount () {
  axios.get('/api/data')
  .then(res => {
    //loop through list of objects
    let exerciseArr = []
    let foodArr = []
    for (let i = 0; i < res.data.length; i++) {
      //if res has value exercise push the object into exercise
      if (res.data[i]["exercise"]) {
         exerciseArr.push(res.data[i]);
      }
      //else push to the food array
      else {
         foodArr.push(res.data[i]);
      }
    }

    this.setState({
      exercise: exerciseArr,
      food: foodArr
    })
  
   })
 
  }

  //set the current state to the values from the database




 //get data from mongo to initially populate the tables if data has been saved before
 getData () {
  axios.get('/api/data')
  .then(res => {
    console.log("get data: ", res)
    // console.log(Object.keys(res.data[0]));
    //loop through list of objects
    for (let i = 0; i < res.data.length; i++) {
      //if res has value exercise push the object into exercise
      if (res.data[i]["exercise"]) {
         this.state.exercise.push(res.data[i]);
      }
      //else push to the food array
      else {
         this.state.food.push(res.data[i]);
      }
    }
    console.log(this.state.exercise);
    console.log(this.state.food);

    this.setState({
      exercise: this.state.exercise,
      food: this.state.food
    })
  
   })
 }

  //when a new row is added, send it to the backend route /api/tables
  onAddRow (row) {
    // console.log('row: ', row);
    axios.post('/api/tables', row)
    .then(res => {
      console.log(this);
      this.setState({exercise: res});
      console.log(res.data);
    })
  }
  // when a cell is edited, send the new row to the backend route /api/tables
  cellEdit(row) {
    console.log(row)
    // make axios call to save to back end
    axios.put('/api/update', row)
    .then(res => {
      console.log(res);
      // console.log(res.data);
    })
  }

  render() {
    const options = {
      afterInsertRow: this.onAddRow
  }
    return (
      <Container>
        <br />
         <Row>
           <Col><Image src="https://images.unsplash.com/photo-1550977616-efc580084ac5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1038&q=80" fluid /></Col>
           <Col><Image src="https://images.unsplash.com/photo-1540111970170-b1c4d4fbadaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" fluid /></Col>
           <Col><Image src="https://images.unsplash.com/photo-1533727937480-da3a97967e95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" fluid /></Col>
           <br />
         </Row>
      <BootstrapTable  data={this.state.exercise} cellEdit={ this.cellEditProp } options={options} insertRow={ true } > 
          <TableHeaderColumn dataField='id' isKey={true} hidden></TableHeaderColumn>
          <TableHeaderColumn dataField='date'  editable={ {type: 'textarea'} }>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='exercise' editable={ { type: 'textarea', validator: "" } }>Exercise</TableHeaderColumn>
          <TableHeaderColumn dataField='time' editable={ { type: 'textarea', validator: "" } }>Time</TableHeaderColumn>
          <TableHeaderColumn dataField='intensity' editable={ { type: 'textarea', options: { values: "" } } }>Intensity</TableHeaderColumn>
          <TableHeaderColumn dataField='caloriesBurned' editable={ { type: 'textarea', options: { values: 'Y:N' } } }>Calories Burned</TableHeaderColumn>
      </BootstrapTable> <br /> <br />
      <BootstrapTable data={this.state.food} cellEdit={ this.cellEditProp } options={options} insertRow={ true }>
      <TableHeaderColumn dataField='id' isKey={true} hidden></TableHeaderColumn>
      <TableHeaderColumn dataField='date'  editable={ {type: 'textarea'} }>Date</TableHeaderColumn>
      <TableHeaderColumn dataField='breakfast' editable={ { type: 'textarea', validator: "" } }>Breakfast</TableHeaderColumn>
      <TableHeaderColumn dataField='lunch' editable={ { type: 'textarea', validator: "" } }>Lunch</TableHeaderColumn>
      <TableHeaderColumn dataField='dinner' editable={ { type: 'textarea' } }>Dinner</TableHeaderColumn>
      <TableHeaderColumn dataField='caloriesConsumed' editable={ { type: 'textarea'} }>Calories Consumed</TableHeaderColumn>
  </BootstrapTable>
         <Row>
           <Col><Image src="https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" fluid /></Col>
           <Col><Image src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" fluid /></Col>
           <Col><Image src="https://images.unsplash.com/photo-1499192424706-82662b9911f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" fluid /></Col>
         </Row>
         <br />
  </Container>
    );
  }
}

export default EditTypeTable;
