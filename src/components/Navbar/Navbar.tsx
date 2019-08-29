import * as React from 'react';

import Navitem from './Navitem';

import './Navbar.css';

interface Props {
  onClick: (route: string) => void;
}

class Navbar extends React.Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(route: string) {
    this.props.onClick(route);
  }

  public render() {
    return (
      <nav className={'navbar App-header'}>
        <Navitem
          index={1}
          route={'Setup'}
          onClick={this.handleClick}
        />
        <Navitem
          index={2}
          route={'Play'}
          onClick={this.handleClick}
        />
        <Navitem
          index={3}
          route={'Stats'}
          onClick={this.handleClick}
        />
        <Navitem
          index={4}
          route={'Edit'}
          onClick={this.handleClick}
        />
      </nav>
    );
  }
}

export default Navbar;
