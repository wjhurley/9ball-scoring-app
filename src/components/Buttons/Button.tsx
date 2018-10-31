import * as React from 'react';

import './Buttons.css';

export interface Props {
  className?: string;
  onClick?: () => void;
  text: string;
}

interface State {

}

class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick() {
    this.props.onClick
      ? this.props.onClick()
      : () => { return false; };
  }

  public render() {
    let className = this.props.className;
    return (
      <button
        className={className ? className : "button"}
        onClick={() => this.handleClick()}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
