import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import logo from '../../logo.svg';
import '../../App.css';

import Board from '../Board';

import * as ROUTES from '../../routes';

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path={ROUTES.HOME} component={Board} />
      <Route exact path={ROUTES.BOARD} component={Board} />
    </Router>
  );
}

export default App;
