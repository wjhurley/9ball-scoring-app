import React, { Component } from 'react';

import Navbar from './components/Navbar/Navbar';
import PlayerStatus from './components/PlayerStatus/PlayerStatus';
import Balls from './components/Balls/Balls';
import Buttons from './components/Buttons/Buttons';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <PlayerStatus />
        <Balls />
        <Buttons />
      </div>
    );
  }
}

export default App;
