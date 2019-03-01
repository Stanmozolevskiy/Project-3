import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/login page/Login";
import User from "./components/pages/User";



function App() {
  return (
    <Router>
      <div>
        
        <Login />
        <Route exact path="/user" component={User} />
        <Route exact path="/about" component={About}  />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/contact" component={Contact} />
      </div>
    </Router>
  );
}

export default App;
