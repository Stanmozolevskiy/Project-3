import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
<<<<<<< HEAD:client/src/App.js
import Contact from "./components/pages/Contact";
import Login from "./components/pages/login page/Login";
<<<<<<< HEAD:client/src/App.js
import User from "./components/pages/User";
=======
import CustomNavbar from "./components/Navbar";
import CustomFooter from "./components/Footer";
import './appstyle.css';
>>>>>>> headerandfooter:src/App.js
=======
import Contact from "./components/pages/foodPage/Contact"
import Login from "./components/pages/login page/Login"
>>>>>>> Orlando:src/App.js



function App() {
  return (
    <Router>
      <div>
        <CustomNavbar />
        <Login />
<<<<<<< HEAD:client/src/App.js
        <Route exact path="/user" component={User} />
=======
        <CustomFooter />
>>>>>>> headerandfooter:src/App.js
        <Route exact path="/about" component={About}  />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/contact" component={Contact} />
      </div>
    </Router>
  );
}

export default App;
