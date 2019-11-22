import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";

import MainPage from './MainPage'
import TestPage from './TestPage'
import CallbackPage from './Callback'

// Default styling
import './app.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history} basename={'/ui'}>
        <div>
          <Route path={`${process.env.PUBLIC_URL}/`} component={MainPage} />
          <Route path={`${process.env.PUBLIC_URL}/test`} component={TestPage} />
          <Route path={`${process.env.PUBLIC_URL}/callback`} component={CallbackPage} />
          {/* <Redirect key="default-redirect" to="/" /> */}
        </div>
      </Router>
    );
  }
}

export default App;
