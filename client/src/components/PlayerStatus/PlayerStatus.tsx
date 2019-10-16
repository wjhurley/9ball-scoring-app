import * as React from 'react';

import Player from './Player';

import './PlayerStatus.css';

export interface Props {
  p1currentPts: number;
  p1requiredPts: number;
  p1defense: number;
  p2currentPts: number;
  p2requiredPts: number;
  p2defense: number;
}

class PlayerStatus extends React.PureComponent<Props> {
  public props: Readonly<Props> = this.props;

  public render() {
    const {
      p1currentPts,
      p1requiredPts,
      p1defense,
      p2currentPts,
      p2requiredPts,
      p2defense,
    } = this.props;

    return (
      <div>
        <Player
          player={'Player 1'}
          currentPts={p1currentPts || 0}
          requiredPts={p1requiredPts || 0}
          defense={p1defense || 0}
        />
        <Player
          player={'Player 2'}
          currentPts={p2currentPts || 0}
          requiredPts={p2requiredPts || 0}
          defense={p2defense || 0}
        />
      </div>
    );
  }
}

export default PlayerStatus;
