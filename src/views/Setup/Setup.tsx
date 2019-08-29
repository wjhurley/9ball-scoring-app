import * as React from 'react';

import Button from './../../components/Buttons/Button';
import TextBox from './../../components/TextBox/TextBox';

import './Setup.css';

interface Props {}

interface State {}

class Setup extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.checkPlayerName = this.checkPlayerName.bind(this);
  }

  private checkPlayerName(name: string): boolean {
    // TODO: Create function that will check db for player's name
    return name ? true : false;
  }

  public render() {
    return (
      <div className={'setup'}>
        <h1>Match Setup</h1>
        <div className={'player1'}>
          <TextBox
            className={'p1Name'}
            onChange={() => this.checkPlayerName}
            placeholder={'Player 1 Name'}
          />
          <TextBox
            className={'p1Skill'}
            placeholder={'Skill Level'}
          />
        </div>
        <div className={'player2'}>
          <TextBox
            className={'p2Name'}
            onChange={() => this.checkPlayerName}
            placeholder={'Player 2 Name'}
          />
          <TextBox
            className={'p2Skill'}
            placeholder={'Skill Level'}
          />
        </div>
        <Button
          className={'setupButton button'}
          text={'Set Data and Start Match'}
        />
      </div>
    );
  }
}

export default Setup;
