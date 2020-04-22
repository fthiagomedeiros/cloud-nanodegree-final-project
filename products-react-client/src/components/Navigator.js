import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Navigator extends Component {
    render() {
        const { isAuthenticated, login, logout } = this.props.auth;
        return (
            <nav>
                <ul>
                   <li>
                       <Link to="/">Home</Link>
                   </li>
                    <li>
                        <Link to="/public">Public</Link>
                    </li>
                    { isAuthenticated() && (
                        <ul>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/private">Private</Link>
                            </li>
                            <li>
                                <Link to="/create">Create Product</Link>
                            </li>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <button onClick={isAuthenticated() ? logout : login}>
                                    {isAuthenticated() ? 'Log Out': 'Log In'}
                                </button>
                            </li>
                        </ul>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Navigator;
