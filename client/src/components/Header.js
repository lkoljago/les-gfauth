import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/"> Djadavin API</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
           
          </ul>
          
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sing Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">Sing In</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/singout">Sing Out</Link>
            </li>
           
          </ul>
        </div> 
      </nav>
    )
  }
}