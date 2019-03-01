import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
import Login from "./components/pages/loginPage/Login";
import User from "./components/pages/User";
import CustomNavbar from "./components/Navbar";
import './appstyle.css';
import Contact from "./components/pages/foodPage/Contact"
import noMatch from "./components/pages/noMatch";




function App() {
  return (
    <Router>
      <div>
        <CustomNavbar />
        <Switch>
        <Route exact path="/" component={Login} /> 
        <Route exact path="/user" component={User} />
        <Route exact path="/about" component={About}  />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/contact" component={Contact} />
        <Route component={noMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
