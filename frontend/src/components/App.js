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
      <Router history={history}>
        <div>
          <Route path="/" component={MainPage} />
          <Route path="/test" component={TestPage} />
          <Route path="/callback" component={CallbackPage} />
          {/* <Redirect key="default-redirect" to="/" /> */}
        </div>
      </Router>
    );
  }
}

export default App;
