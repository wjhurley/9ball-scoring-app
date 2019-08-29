import * as _ from 'lodash';
import * as React from 'react';

import './Buttons.css';

interface Props {
  className?: string;
  onClick?: () => void;
  text: string;
}

class Button extends React.Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }

    return false;
  }

  public render() {
    const className = !_.isNil(this.props.className)
      ? this.props.className
      : 'button';

    return (
      <button
        className={className}
        onClick={this.handleClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
