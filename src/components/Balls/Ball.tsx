import * as React from 'react';

import './Balls.css';

export interface Props {
  src: string;
  alt: string;
}

class Ball extends React.PureComponent<Props> {
  public render() {
    return (
      <img
        className={'ball'}
        src={this.props.src}
        alt={this.props.alt}
      />
    );
  }
}

export default Ball;
