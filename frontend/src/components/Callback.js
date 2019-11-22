import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';

import userManager from "../store/userManager";

class CallbackPage extends React.Component {
    // successCallback = (user) => {
    //     console.log("Sucess!")
    //     this.props.history.push(user.state.redirectUrl);
    // };

    // errorCallback = (error) => {
    //     console.log("Could not perform OAuth flow:", error);
    //     this.props.history.push('/');
    // }

    render() {
        return (
            // <CallbackComponent userManager={userManager}
            //     successCallback={this.successCallback} errorCallback={this.errorCallback} >
            //     <div>Thanks for authenticating, you are about to be redirected...</div>
            // </CallbackComponent>
            <CallbackComponent
                userManager={userManager}
                successCallback={() => {
                    console.log("Sucess!")
                    this.props.history.push('/');
                }}
                errorCallback={error => {
                    console.log("Could not perform OAuth flow:", error);
                    this.props.history.push('/');
                }}
            >
                <div>Thanks for authenticating, you are about to be redirected...</div>
                {/* <div>Back on callback page...</div> */}
            </CallbackComponent>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(null, mapDispatchToProps)(CallbackPage);