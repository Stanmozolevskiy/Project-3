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

        
              <h1>
                
               {this.state.user.firstName}
               <br/>
               {this.state.user.lastName}
               <br/>
               {this.state.user.fitnessGoal}
              </h1>
           
 
    );
  }
}

export default userName;
