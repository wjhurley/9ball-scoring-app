import React, { Component } from 'react';

import PlayerStatus from './../../components/PlayerStatus/PlayerStatus';
import Balls from './../../components/Balls/Balls';
import Buttons from './../../components/Buttons/Buttons';

class Edit extends Component {
  render() {
    return (
      <div>
        <PlayerStatus />
        <Balls />
      </div>
    );
  }
}

export default Edit;
