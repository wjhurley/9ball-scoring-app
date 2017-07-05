import React, { Component } from 'react';

import './PlayerStatus.css';

class Player extends Component {
  render() {
    const player = this.props.player,
          currentPts = this.props.currentPts,
          requiredPts = this.props.requiredPts,
          pointsLeft = requiredPts - currentPts,
          defense = this.props.defense,
          playerInfo = `${player} ${currentPts}/${requiredPts} (${pointsLeft}) Def:${defense}`;
    return (
      <p>{playerInfo}</p>
    );
  }
}

export default Player;
