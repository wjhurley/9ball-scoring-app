import React, { Component } from 'react';

import Setup from './Setup/Setup';
import Play from './Play/Play';
import Stats from './Stats/Stats';
import Edit from './Edit/Edit';

class Main extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
