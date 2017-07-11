import React, { Component } from 'react';

import Header from './views/Header';
import Main from './views/Main';

import Setup from './views/Setup/Setup';
import Play from './views/Play/Play';
import Stats from './views/Stats/Stats';
import Edit from './views/Edit/Edit';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerLevel: [
        {
          skillLevel: 1,
          ballsRequired: 14
        },
        {
          skillLevel: 2,
          ballsRequired: 19
        },
        {
          skillLevel: 3,
          ballsRequired: 25
        },
        {
          skillLevel: 4,
          ballsRequired: 31
        },
        {
          skillLevel: 5,
          ballsRequired: 38
        },
        {
          skillLevel: 6,
          ballsRequired: 46
        },
        {
          skillLevel: 7,
          ballsRequired: 55
        },
        {
          skillLevel: 8,
          ballsRequired: 65
        },
        {
          skillLevel: 9,
          ballsRequired: 75
        }
      ],
      currentRoute: ""
    };
    this.handleRoute = this.handleRoute.bind(this);
  }
  handleRoute(route) {
    console.log(route);
    this.setState({
      currentRoute: route
    });
  }
  render() {
    let route = this.state.currentRoute;
    if(route === 'Play') {
      return (
        <div className="App">
          <Header
            onClick={(route) => this.handleRoute(route)}
          />
          <Main>
            <Play />
          </Main>
        </div>
      );
    } else if(route === 'Edit') {
      return (
        <div className="App">
          <Header
            onClick={(route) => this.handleRoute(route)}
          />
          <Main>
            <Edit />
          </Main>
        </div>
      );
    } else if(route === 'Stats') {
      return (
        <div className="App">
          <Header
            onClick={(route) => this.handleRoute(route)}
          />
          <Main>
            <Stats />
          </Main>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header
            onClick={(route) => this.handleRoute(route)}
          />
          <Main>
            <Setup />
          </Main>
        </div>
      );
    }
  }
}

export default App;
