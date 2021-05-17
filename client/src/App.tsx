import * as React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import { getUserData } from './reducers/userSlice';
import { RootState } from './store';
import Login from './views/Login';

import './App.css';

function App(): JSX.Element {
  const { accessToken } = useSelector((state: RootState) => getUserData(state));

  React.useLayoutEffect(() => {}, [accessToken]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/setup"></Route>
          <Route path="/play"></Route>
          <Route path="/stats"></Route>
          <Route path="/edit"></Route>
          <Route path="/">{accessToken ? null : <Redirect to="/login" />}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
