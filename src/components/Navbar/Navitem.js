import React, { Component } from 'react';

import './Navbar.css';

class Navitem extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(text) {
    this.props.onClick(text);
  }
  render() {
    let text = this.props.text;
    return (
      <li
        className='navitem'
        onClick={() => this.handleClick(text)}
      >
        {text}
      </li>
    );
  }
}

export default Navitem;
