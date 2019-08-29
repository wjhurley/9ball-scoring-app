import * as React from 'react';

import Navbar from './../components/Navbar/Navbar';

interface Props {
  onClick: (route: string) => void;
}

class Header extends React.Component<Props, {}> {
  public constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(route: string) {
    this.props.onClick(route);
  }

  public render() {
    return (
      <Navbar
        onClick={this.handleClick}
      />
    );
  }
}

export default Header;
