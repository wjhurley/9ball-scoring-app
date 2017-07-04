import React, { Component } from 'react';

import Button from './Button';

import './Buttons.css';

class Buttons extends Component {
  render() {
    return (
      <div>
        <Button text='Miss' />
        <Button text='Unlock Dead Balls' />
        <Button text='Defense' />
      </div>
    );
  }
}

export default Buttons;
