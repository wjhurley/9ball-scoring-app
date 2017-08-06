import React, { Component } from 'react';

import './Buttons.css';

class Button extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick();
  }
  render() {
    let className = this.props.className;
    return (
      <button
        className={className ? className : "button"}
        onClick={() => this.handleClick()}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
