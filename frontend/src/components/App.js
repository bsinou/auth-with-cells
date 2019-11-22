import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";

import MainPage from './MainPage'
import Callback from './Callback'

// Default styling
import './app.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" component={MainPage} />
          <Route path="/callback" component={Callback} />
          <Redirect key="default-redirect" to="/" />
        </div>
      </Router>
    );
  }
}

export default App;
