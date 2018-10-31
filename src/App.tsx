import * as React from 'react';

import Header from './views/Header';
import Main from './views/Main';

import Edit from './views/Edit/Edit';
import Play from './views/Play/Play';
import Setup from './views/Setup/Setup';
import Stats from './views/Stats/Stats';

import './App.css';

export interface PlayerLevel {
  skillLevel: number;
  ballsRequired: number;
}

export interface Props {

}

interface State {
  playerLevels: PlayerLevel[];
  currentRoute: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      playerLevels: [
        {
          skillLevel: 1,
          ballsRequired: 14,
        },
        {
          skillLevel: 2,
          ballsRequired: 19,
        },
        {
          skillLevel: 3,
          ballsRequired: 25,
        },
        {
          skillLevel: 4,
          ballsRequired: 31,
        },
        {
          skillLevel: 5,
          ballsRequired: 38,
        },
        {
          skillLevel: 6,
          ballsRequired: 46,
        },
        {
          skillLevel: 7,
          ballsRequired: 55,
        },
        {
          skillLevel: 8,
          ballsRequired: 65,
        },
        {
          skillLevel: 9,
          ballsRequired: 75,
        }
      ],
      currentRoute: '',
    };
    this.handleRoute = this.handleRoute.bind(this);
  }

  private handleRoute(route: string): void {
    console.log(route);
    this.setState({
      currentRoute: route,
    });
  }

  public render() {
    let route = this.state.currentRoute;
    if (route === 'Play') {
      return (
        <div className="App">
          <Header
            onClick={(route: string) => this.handleRoute(route)}
          />
          <Main>
            <Play />
          </Main>
        </div>
      );
    }
    else if (route === 'Edit') {
      return (
        <div className="App">
          <Header
            onClick={(route: string) => this.handleRoute(route)}
          />
          <Main>
            <Edit
              p1score={0}
              p1defense={0}
              innings={0}
              deadBalls={0}
              p2score={0}
              p2defense={0}
            />
          </Main>
        </div>
      );
    }
    else if (route === 'Stats') {
      return (
        <div className="App">
          <Header
            onClick={(route: string) => this.handleRoute(route)}
          />
          <Main>
            <Stats />
          </Main>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Header
            onClick={(route: string) => this.handleRoute(route)}
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
