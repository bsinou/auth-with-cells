import React, { Component } from 'react';

class MainPage extends Component {

  render() {
    const { isAuth, displayName } = this.props

    let page = (
      <div className="App">
        <header className="App-header">
          <p>
            Hello World!
            </p>
          <a className="App-link" href="#">
            Login
            </a>
        </header>
      </div>
    );

    if (isAuth) {
      page = (
        <div className="App">
          <header className="App-header">
            <p>
              Hello {displayName}!
            </p>
            <a className="App-link" href="#">
              Logout
            </a>
          </header>
        </div>
      );
    }

    return page;

  }
}

export default MainPage;
