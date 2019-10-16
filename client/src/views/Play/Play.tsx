import * as React from 'react';

import PlayerStatus from './../../components/PlayerStatus/PlayerStatus';
import Balls from './../../components/Balls/Balls';
import Buttons from './../../components/Buttons/Buttons';

import './Play.css';

class Play extends React.Component {
  public render() {
    return (
      <div>
        <PlayerStatus
          p1currentPts={0}
          p1requiredPts={0}
          p1defense={0}
          p2currentPts={0}
          p2requiredPts={0}
          p2defense={0}
        />
        <Balls />
        <Buttons />
      </div>
    );
  }
}

export default Play;
