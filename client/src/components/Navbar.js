import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './navbarstyle.css';

class CustomNavbar extends React.Component {

render() {
  return (
    <Navbar expand="lg" id="navbar">
    <Navbar fixed="top" />
    <div class="col-md-4">
      <Button size="large" className="btn-outline-secondary col-md-12" href="#profile" id="navbutton">My Profile</Button>
      </div>
      <div class="col-md-4">
      <Button size="large" className="btn-outline-secondary col-md-12" href="#results" id="navbutton">Results</Button>
      </div>
      <div class="col-md-4">
      <Button size="large" className="btn-outline-secondary col-md-12" href="#signin" id="navbutton">Sign In</Button>
      </div>
    </Navbar>
  );
}
}

export default CustomNavbar;