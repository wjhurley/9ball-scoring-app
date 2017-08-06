import React, { Component } from 'react';

import Button from './../../components/Buttons/Button';
import TextBox from './../../components/TextBox/TextBox';

import './Setup.css';

class Setup extends Component {
  render() {
    let text = 'Set Data and Start Match';
    return (
      <div className="setup">
        <h1>Match Setup</h1>
        <div className="player1">
          <TextBox
            className="p1Name"
            placeholder='Player 1 Name'
          />
          <TextBox
            className="p1Skill"
            placeholder='Skill Level'
          />
        </div>
        <div className="player2">
          <TextBox
            className="p2Name"
            placeholder='Player 2 Name'
          />
          <TextBox
            className="p2Skill"
            placeholder='Skill Level'
          />
        </div>
        <Button
          className="setupButton button"
          text={text}
        />
      </div>
    );
  }
}

export default Setup;
