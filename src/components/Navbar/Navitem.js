import React, { Component } from 'react';

import './Navbar.css';

class Navitem extends Component {
  render() {
    return (
      <li className='navitem'>{this.props.text}</li>
    );
  }
}

export default Navitem;
