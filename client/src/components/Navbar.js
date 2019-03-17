import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './navbarstyle.css';
import { Link } from 'react-router-dom';

class CustomNavbar extends React.Component {

  render() {
    return (
      <Navbar expand="lg" id="navbar">
        <Navbar fixed="top" />
        <div className="col-md-2 text-center"><Link to=""><i className="fas fa-home fa-5x"></i></Link> </div>
        <div className="col-md-3">
          <Link to="FitnessLog"><Button size="large" className="btn-outline-secondary col-md-12" id="navbutton">Fitness Log</Button></Link>
        </div>
        <div className="col-md-3">
          <Link to="FitnessSummary" ><Button size="large" className="btn-outline-secondary col-md-12" id="navbutton">Fitness Summary</Button></Link>
        </div>
        <div className="col-md-2">
          <Link to="/myProfile"> <Button size="large" className="btn-outline-secondary col-md-12" id="navbutton">Sign up</Button> </Link>
        </div>
        <div className="col-md-2">
          <Link to="/SignIn"><Button size="large" className="btn-outline-secondary col-md-12" id="navbutton">Sign In</Button></Link>
        </div>
      </Navbar>
    );
  }
}

export default CustomNavbar;