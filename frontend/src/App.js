import React, { Component } from 'react';

// Dummy page that displays distinct texts depending on the auth state
// And has a link to login / logout
import MainPage from './MainPage'

// Default styling from React
import './App.css';

class App extends Component {
  render() {
    return ( <MainPage />);
  }
}

export default App;
