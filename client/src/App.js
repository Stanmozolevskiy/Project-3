import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
import Login from "./components/pages/login page/Login";
import User from "./components/pages/User";
import CustomNavbar from "./components/Navbar";
import CustomFooter from "./components/Footer";
import './appstyle.css';
import Contact from "./components/pages/foodPage/Contact"




function App() {
  return (
    <Router>
      <div>
        <CustomNavbar />
        <Login />
        <Route exact path="/user" component={User} />
        <Route exact path="/about" component={About}  />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/contact" component={Contact} />
        <CustomFooter />
      </div>
    </Router>
  );
}

export default App;
