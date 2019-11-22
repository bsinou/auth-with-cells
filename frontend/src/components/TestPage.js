import React, { Component } from 'react';
import { connect } from 'react-redux';

class TestPage extends Component {

  render() {
    const { user } = this.props;
    let notAuth = !user || user.expired

    return (
      <div className="App">
        <header className="App-header">
          <p>{notAuth ? "Test, no auth found." : "Test. Hello " + user.profile.name + "!"}</p>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user
  };
}

export default connect(mapStateToProps)(TestPage);
