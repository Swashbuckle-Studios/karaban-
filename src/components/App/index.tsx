import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import logo from '../../logo.svg';
import '../../App.css';

import Board from '../Board';
import Home from '../Home';
// import Dashboard from '../Dashboard';
import Dashboard from '../Dashboard';

import * as ROUTES from '../../routes';

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.BOARD} component={Board} />
      <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
    </Router>
  );
}

export default App;
