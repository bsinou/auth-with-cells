import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';

import * as actions from './store/authActions';

const defaultMail = 'alice@example.com';
const defaultPwd = 'password';

class MainPage extends Component {

  submitHandler = (event) => {
    event.preventDefault();
    this.props.isAuth ?  this.props.logout() :  this.props.doAuth(defaultMail, defaultPwd);
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
    // Login / Logout button
    let button = (<Button
      label="Submit"
      variant="contained"
      color={this.props.isAuth ? "secondary" : "primary"}
      aria-label="submit"
      style={{ margin: 15 }}
      onClick={(event) => this.submitHandler(event)} >
      {this.props.isAuth ? "Logout" : "Login"}
    </Button>);

    // The page
    let page = (
      <div className="App">
        <header className="App-header">
          <p>{
            this.props.isAuth ? "Hello " + this.props.displayName + "!" : "Hello World!"}
          </p>
          {button}
        </header>
      </div>
    );

    return page;
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.token !== null,
    displayName: state.displayName,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doAuth: (email, password) => dispatch(actions.doAuth(email, password)),
    logout: () => dispatch(actions.authLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

