import * as React from 'react';

import './TextBox.css';

interface Props {
  className: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

class TextBox extends React.Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    return false;
  }

  public render() {
    return (
      <input
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default TextBox;
