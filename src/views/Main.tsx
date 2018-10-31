import * as React from 'react';

export interface Props {
  children: any;
}

class Main extends React.Component<Props, {}> {
  public render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
