import React, { Component } from 'react';

import PlayerStatus from './../../components/PlayerStatus/PlayerStatus';
import Balls from './../../components/Balls/Balls';
import Buttons from './../../components/Buttons/Buttons';

import './Play.css';

class Play extends Component {
  render() {
    return (
      <div>
        <PlayerStatus />
        <Balls />
        <Buttons />
      </div>
    );
  }
}

export default Play;
