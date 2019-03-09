import React, { Component } from "react";

import API from "../../../utils/API";

class userName extends Component {
  state = {
    user: {}
  };
  // When this component mounts, grab the user with the _id of this.props.match.params.id
  //
  componentDidMount() {
    API.getUser(this.props.match.params.id)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err)); 
  }

  render() {
    return (

        
              <h4>
                
               {this.state.user.firstName}
               <br/>
               <br/>
               {this.state.user.lastName}
               <br/>
               <br/>
               {this.state.user.fitnessGoal}
              </h4>
           
 
    );
  }
}

export default userName;
