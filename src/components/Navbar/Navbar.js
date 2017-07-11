import React, { Component } from 'react';

import Navitem from './Navitem';

import './Navbar.css';

class Navbar extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(text) {
    this.props.onClick(text);
  }
  render() {
    return (
      <nav className='navbar'>
        <Navitem
          text='Setup'
          onClick={(text) => this.handleClick(text)}
        />
        <Navitem
          text='Play'
          onClick={(text) => this.handleClick(text)}
        />
        <Navitem
          text='Stats'
          onClick={(text) => this.handleClick(text)}
        />
        <Navitem
          text='Edit'
          onClick={(text) => this.handleClick(text)}
        />
      </nav>
    );
  }
}

export default Navbar;
