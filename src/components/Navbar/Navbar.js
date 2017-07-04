import React, { Component } from 'react';

import Navitem from './Navitem';

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <Navitem text='Setup' />
        <Navitem text='Play' />
        <Navitem text='Stats' />
        <Navitem text='Edit' />
      </nav>
    );
  }
}

export default Navbar;
