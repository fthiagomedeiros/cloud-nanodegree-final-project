import React, {Component} from 'react';

class Profile extends Component {

    state = {
      profile: null,
      error: ''
    };

    componentDidMount() {
        this.loadUserProfile();
    }

    loadUserProfile() {
        this.props.auth.getProfile( (profile, error) => this.setState({profile, error}));
    }

    render() {
        const { profile } = this.state;
        if (!profile) return null;
        return (
            <div>
                <h1>Profile</h1>
                <p>You are logged in as {this.state.profile.nickname}</p>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
        );
    }
}

export default Profile;
