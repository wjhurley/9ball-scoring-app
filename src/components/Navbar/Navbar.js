import React, { Component } from 'react';

import Navitem from './Navitem';

import './Navbar.css';

class Navbar extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(route) {
    this.props.onClick(route);
  }
  render() {
    return (
      <nav className="navbar App-header">
        <Navitem
          route='Setup'
          onClick={(route) => this.handleClick(route)}
        />
        <Navitem
          route='Play'
          onClick={(route) => this.handleClick(route)}
        />
        <Navitem
          route='Stats'
          onClick={(route) => this.handleClick(route)}
        />
        <Navitem
          route='Edit'
          onClick={(route) => this.handleClick(route)}
        />
      </nav>
    );
  }
}

export default Navbar;
