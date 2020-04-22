import React, { Component } from 'react';

class Callback extends Component {

    componentDidMount() {
        //Handling auth if expected values are in URL
        if (/access-token|id_token|error/.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        } else {
            throw new Error('Callback URL is invalid.')
        }
    }

    render() {
        return (
            <h1>
               Loading...
            </h1>
        );
    }
}

export default Callback;
