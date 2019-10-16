import * as React from 'react';

import Button from './../../components/Buttons/Button';

import './Edit.css';

interface Props {
  deadBalls: number;
  innings: number;
  p1Defense: number;
  p1Score: number;
  p2Defense: number;
  p2Score: number;
}

class Edit extends React.Component<Props, {}> {
  public props: Readonly<Props> = this.props;

  public render() {
    const { deadBalls, innings, p1Defense, p1Score, p2Defense, p2Score } = this.props;

    return (
      <div className={'edit'}>
        <div className={'editP1'}>
          <p>{`P1 Score: ${p1Score}`}</p>
          <Button text={'+'} />
          <Button text={'-'} />
          <p>{`P1 Defs: ${p1Defense}`}</p>
          <Button text={'+'} />
          <Button text={'-'} />
          <p>{`Innings: ${innings}`}</p>
          <Button text={'+'} />
          <Button text={'-'} />
        </div>
        <div className={'editP2'}>
          <p>{`P2 Score: ${p2Score}`}</p>
          <Button text={'+'} />
          <Button text={'-'} />
          <p>{`P2 Defs: ${p2Defense}`}</p>
          <Button text={'+'} />
          <Button text={'-'} />
          <p>{`Dead Balls: ${deadBalls}`}</p>
          <Button text={'+'} />
          <Button text={'-'} />
        </div>
      </div>
    );
  }
}

export default Edit;
