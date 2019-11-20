import React, { Component } from 'react';

import axios from 'axios'

// Dummy page that will display different pages depending on the auth state
import MainPage from './MainPage'

// Default styling from React
import './App.css';

class App extends Component {

  componentDidMount() {
    // Simply insure we can reach the API server
    axios.get('/api/').then(
      response => {
        console.log(response)
      }
    );
  }

  render() {
    let dName = "Emma Kohl";

    return (
      <MainPage isAuth={true} displayName={dName} />
    );
  }
}

export default App;
