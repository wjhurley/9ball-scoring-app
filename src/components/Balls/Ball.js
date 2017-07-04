import React, { Component } from 'react';

import './Balls.css';

class Ball extends Component {
  render() {
    return (
      <img
        className='ball'
        src={this.props.src}
        alt={this.props.alt}
      />
    );
  }
}

export default Ball;
