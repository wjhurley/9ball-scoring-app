import * as React from 'react';

import './TextBox.css';

export interface Props {
  className: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

interface State {

}

class TextBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange
    ? this.props.onChange(e)
    : () => { return false; };
  }

  public render() {
    return (
      <input
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={(e) => this.handleChange(e)}
      />
    );
  }
}

export default TextBox;
