import React, { Component } from 'react';

class Private extends Component {

    state = {
        message: 'no message',
        address: 'no address'
    };

    componentDidMount() {
        this.loadDataFromServer()
    }

    loadDataFromServer() {
        try {
            fetch("/private", {
                headers: {
                    Authorization: `Bearer ${this.props.auth.getToken()}`
                }
            }).then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.')
            })
                .then(response => this.setState({ message: response.message }))
                .catch(error => this.setState({ message: error.message }))
        } catch (e) {
            this.setState({ message: 'Network response was not ok.' })
        }
    }

    render() {
        return (
            <p>{this.state.message}</p>
        );
    }
}

export default Private;
