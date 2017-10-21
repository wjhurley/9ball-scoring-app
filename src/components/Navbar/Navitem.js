import React, { Component } from 'react';

import './Navbar.css';

class Navitem extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(route) {
    this.props.onClick(route);
  }
  render() {
    let route = this.props.route;
    return (
      <li
        className='navitem'
        tabIndex={this.props.index}
        onClick={() => this.handleClick(route)}
      >
        {route}
      </li>
    );
  }
}

export default Navitem;
