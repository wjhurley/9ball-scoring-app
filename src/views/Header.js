import React, { Component } from 'react';

import Navbar from './../components/Navbar/Navbar';

class Header extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(route) {
    this.props.onClick(route);
  }
  render() {
    return (
      <Navbar
        onClick={(route) => this.handleClick(route)}
      />
    );
  }
}

export default Header;
