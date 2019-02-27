import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './footerstyle.css';

class CustomFooter extends React.Component {

  render() {
    return (
      <div id="footer">
      <div class="row" id="inputdiv">
      <div class="col-md-4" id="options">
      <a href="url" id="optionslink">Exercise </a>|<a href="url" id="optionslink"> Duration </a>|<a href="url" id="optionslink"> Intensity</a>
      </div>
      <div class="col-md-4" id="input">
      <input type="password" class="form-control" id="text input" placeholder="Text Input"></input>
      </div>
      <div class="col-md-4" id="send">
      <a href="url" id="optionslink"> > </a>
      </div>
      </div>
      <div class="row" id="inputdiv">
      <div class="col-md-4" id="options">
      <a href="url" id="optionslink">Meal Ingredients </a>|<a href="url" id="optionslink"> Quantity </a>|<a href="url" id="optionslink"> Calories</a>
      </div>
      <div class="col-md-4" id="input">
      <input type="password" class="form-control" id="text input" placeholder="Text Input"></input>
      </div>
      <div class="col-md-4" id="send">
      <a href="url" id="optionslink"> > </a>
      </div>
      </div>
      <div class="row" id="inputdiv">
      <div class="col-md-4" id="options">
      <a href="url" id="optionslink">Week </a>|<a href="url" id="optionslink"> Day </a>|<a href="url" id="optionslink"> Year</a>
      </div>
      <div class="col-md-4" id="input">
      <input type="password" class="form-control" id="text input" placeholder="Text Input"></input>
      </div>
      <div class="col-md-4" id="send">
      <a href="url" id="optionslink"> > </a>
      </div>
      </div>
      </div>
    );
  }
  }
  
  export default CustomFooter;