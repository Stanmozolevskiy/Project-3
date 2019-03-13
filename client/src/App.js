import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FitnessSummary from "./components/pages/FitnessSummary";
import FitnessLog from "./components/pages/FitnessLog";
import Home from "./components/pages/Home/Home";
import MyProfile from "./components/pages/MyProfile";
import CustomNavbar from "./components/Navbar";
import './appstyle.css';
import Contact from "./components/pages/foodPage/Contact"
import noMatch from "./components/pages/noMatch";
import SignIn from "./components/pages/SignInPage/SignIn"


function App() {
  return (
    <Router>
      <div>
        <CustomNavbar />
        <Switch> 
        <Route exact path="/" component={Home} />
        <Route exact path="/MyProfile" component={MyProfile} />
        <Route exact path="/FitnessSummary" component={FitnessSummary}  />
        <Route exact path="/FitnessLog" component={FitnessLog} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/SignIn" component={SignIn} />
        <Route component={noMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
