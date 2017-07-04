import React, { Component } from 'react';

import Ball from './Ball';

import './Balls.css';
import oneball from './../../img/1ball.png';
import twoball from './../../img/2ball.png';
import threeball from './../../img/3ball.png';
import fourball from './../../img/4ball.png';
import fiveball from './../../img/5ball.png';
import sixball from './../../img/6ball.png';
import sevenball from './../../img/7ball.png';
import eightball from './../../img/8ball.png';
import nineball from './../../img/9ball.png';

class Balls extends Component {
  render() {
    return (
      <div>
        <div>
          <Ball
            src={oneball}
            alt={'1-ball'}
          />
          <Ball
            src={twoball}
            alt={'2-ball'}
          />
          <Ball
            src={threeball}
            alt={'3-ball'}
          />
        </div>
        <div>
          <Ball
            src={fourball}
            alt={'4-ball'}
          />
          <Ball
            src={fiveball}
            alt={'5-ball'}
          />
          <Ball
            src={sixball}
            alt={'6-ball'}
          />
        </div>
        <div>
          <Ball
            src={sevenball}
            alt={'7-ball'}
          />
          <Ball
            src={eightball}
            alt={'8-ball'}
          />
          <Ball
            src={nineball}
            alt={'9-ball'}
          />
        </div>
      </div>
    );
  }
}

export default Balls;
