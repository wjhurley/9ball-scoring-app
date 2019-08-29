import * as React from 'react';

import './PlayerStatus.css';

interface Props {
  player: string;
  currentPts: number;
  requiredPts: number;
  defense: number;
}

class Player extends React.PureComponent<Props> {
  public props: Readonly<Props>;

  public render() {
    const {
      player,
      currentPts,
      requiredPts,
      defense,
    } = this.props;
    const pointsLeft = requiredPts - currentPts;

    return (
      <p className={'player-info'}>
        {`${player} ${currentPts}/${requiredPts} (${pointsLeft}) Def:${defense}`}
      </p>
    );
  }
}

export default Player;
