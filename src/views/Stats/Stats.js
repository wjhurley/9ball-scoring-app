import React, { Component } from 'react';

import PlayerStatus from './../../components/PlayerStatus/PlayerStatus';
import Balls from './../../components/Balls/Balls';
import Buttons from './../../components/Buttons/Buttons';

class Stats extends Component {
  render() {
    return (
      <div>
        <Balls />
        <Buttons />
      </div>
    );
  }
}

export default Stats;
