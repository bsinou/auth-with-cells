import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';

import userManager from "../store/userManager";

class MainPage extends Component {

  submitHandler = (event) => {

    event.preventDefault();
    if (!this.props.user || this.props.expired) {
      userManager.signinRedirect();
    } else {
      userManager.removeUser(); // removes the user data from sessionStorage
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.submitHandler(event)
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { user } = this.props;
    let notAuth = !user || user.expired
    // Login / Logout button
    let button = (<Button
      label="Submit"
      variant="contained"
      color={notAuth ? "primary" : "secondary"}
      aria-label="submit"
      style={{ margin: 15 }}
      onClick={(event) => this.submitHandler(event)} >
      {notAuth ? "Login" : "Logout"}
    </Button>);

    // The page
    let page = (
      <div className="App">
        <header className="App-header">
          <p>{
            notAuth ? "Hello World!" : "Hello " + user.profile.name + "!"}
          </p>
          {button}
        </header>
      </div>
    );

    return page;
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
