import React, { Component } from 'react';

import Navbar from './../components/Navbar/Navbar';

class Header extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(text) {
    this.props.onClick(text);
  }
  render() {
    return (
      <Navbar
        onClick={(text) => this.handleClick(text)}
      />
    );
  }
}

export default Header;
