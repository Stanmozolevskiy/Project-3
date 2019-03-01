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
    <div class="col-md-3">
      <Button size="large" className="btn-outline-secondary col-md-12" href="/user" id="navbutton">My Profile</Button>
      </div>
      <div class="col-md-3">
      <Button size="large" className="btn-outline-secondary col-md-12" href="/blog" id="navbutton">Fitness Log</Button>
      </div>
      <div class="col-md-3">
      <Button size="large" className="btn-outline-secondary col-md-12" href="/about" id="navbutton">Fitness Summary</Button>
      </div>
      <div class="col-md-3">
      <Button size="large" className="btn-outline-secondary col-md-12" href="/Login" id="navbutton">Sign In</Button>
      </div>
    </Navbar>
  );
}
}

export default CustomNavbar;