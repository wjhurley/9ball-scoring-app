import React, { Component } from 'react';

import './Buttons.css';

class Button extends Component {
  render() {
    return (
      <button>{this.props.text}</button>
    );
  }
}

export default Button;
