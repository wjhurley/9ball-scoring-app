import * as React from 'react';

import './PlayerStatus.css';

export interface Props {
  player: string;
  currentPts: number;
  requiredPts: number;
  defense: number;
}

class Player extends React.Component<Props, {}> {
  public render() {
    const {
      player,
      currentPts,
      requiredPts,
      defense
    } = this.props;
    const pointsLeft = requiredPts - currentPts;
    return (
      <p>{`${player} ${currentPts}/${requiredPts} (${pointsLeft}) Def:${defense}`}</p>
    );
  }
}

export default Player;
