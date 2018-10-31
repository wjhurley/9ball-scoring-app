import * as React from 'react';

import './Navbar.css';

export interface Props {
  index: number;
  onClick: (route: string) => void;
  route: string;
}

interface State {

}

class Navitem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick = (route: string) => {
    this.props.onClick(route);
  };

  public render() {
    let route = this.props.route;
    return (
      <li
        className='navitem'
        tabIndex={this.props.index}
        onClick={() => this.handleClick(route)}
      >
        {route}
      </li>
    );
  }
}

export default Navitem;
