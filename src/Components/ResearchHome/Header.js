import React, { Component } from "react";
import "./home.css"

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Running Experiments</a></li>
              <li><a href="#">Create New Experiment</a></li>
              <li><a href="#">Manage</a></li>
            </ul>
        </nav>
      </header>
    );
  }
}

export default Header;