import React, { Component } from 'react';

import Button from './../../components/Buttons/Button';

import './Edit.css';

class Edit extends Component {
  render() {
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
          <p>P1 Defs: {this.props.p1def}</p>
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
          <p>P2 Defs: {this.props.p2def}</p>
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
