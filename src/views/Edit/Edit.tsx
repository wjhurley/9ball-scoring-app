import * as React from 'react';

import Button from './../../components/Buttons/Button';

import './Edit.css';

export interface Props {
  p1score: number;
  p1defense: number;
  innings: number;
  deadBalls: number;
  p2score: number;
  p2defense: number;
}

class Edit extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="edit">
        <div className="editP1">
          <p>P1 Score: {this.props.p1score}</p>
          <Button
            text='+'
          />
          <Button
            text='-'
          />
          <p>P1 Defs: {this.props.p1defense}</p>
          <Button
            text='+'
          />
          <Button
            text='-'
          />
          <p>Innings: {this.props.innings}</p>
          <Button
            text='+'
          />
          <Button
            text='-'
          />
        </div>
        <div className="editP2">
          <p>P2 Score: {this.props.p2score}</p>
          <Button
            text='+'
          />
          <Button
            text='-'
          />
          <p>P2 Defs: {this.props.p2defense}</p>
          <Button
            text='+'
          />
          <Button
            text='-'
          />
          <p>Dead Balls: {this.props.deadBalls}</p>
          <Button
            text='+'
          />
          <Button
            text='-'
          />
        </div>
      </div>
    );
  }
}

export default Edit;
