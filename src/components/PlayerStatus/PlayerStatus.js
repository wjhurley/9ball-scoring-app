import React, { Component } from 'react';

import Player from './Player';

import './PlayerStatus.css';

class PlayerStatus extends Component {
  render() {
    const currentPts = this.props.currentPts ? this.props.currentPts : 0,
          requiredPts = this.props.requiredPts ? this.props.requiredPts : 0,
          defense = this.props.defense ? this.props.defense : 0;
    return (
      <div>
        <Player
          player="Player 1"
          currentPts={currentPts}
          requiredPts={requiredPts}
          defense={defense}
        />
        <Player
          player="Player 2"
          currentPts={currentPts}
          requiredPts={requiredPts}
          defense={defense}
        />
      </div>
    );
  }
}

export default PlayerStatus;
