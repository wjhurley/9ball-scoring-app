import * as React from 'react';

import Button from './Button';

import './Buttons.css';

class Buttons extends React.Component {
  public render() {
    return (
      <div className="buttons">
        <Button
          text='Miss'
        />
        <Button
          text='Unlock Dead Balls'
        />
        <Button
          text='Defense'
        />
      </div>
    );
  }
}

export default Buttons;
