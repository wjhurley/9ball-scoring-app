import * as React from 'react';

import Navitem from './Navitem';

import './Navbar.css';

export interface Props {
  onClick: (route: string) => void;
}

interface State {

}

class Navbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick = (route: string) => {
    this.props.onClick(route);
  };

  public render() {
    return (
      <nav className="navbar App-header">
        <Navitem
          index={1}
          route='Setup'
          onClick={(route: string) => this.handleClick(route)}
        />
        <Navitem
          index={2}
          route='Play'
          onClick={(route: string) => this.handleClick(route)}
        />
        <Navitem
          index={3}
          route='Stats'
          onClick={(route: string) => this.handleClick(route)}
        />
        <Navitem
          index={4}
          route='Edit'
          onClick={(route: string) => this.handleClick(route)}
        />
      </nav>
    );
  }
}

export default Navbar;
