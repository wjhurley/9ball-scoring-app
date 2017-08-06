import React, { Component } from 'react';

import './TextBox.css';

class TextBox extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onChange(e);
  }
  render() {
    return (
      <input
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={(e) => this.handleChange(e)}
      />
    );
  }
}

export default TextBox;
