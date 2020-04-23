import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from './components/Profile'
import Navigator from "./components/Navigator";
import Auth from "./Auth/Auth";
import Callback from "./components/Callback";
import GetProducts from "./components/GetProducts";
import Public from "./components/Public";
import Private from "./components/Private";
import CreateProduct from "./components/CreateProduct";

class App extends Component {

    constructor(props) {
        super(props);
        this.auth = new Auth(this.props.history)
    }

    render() {
        return (
            <>
                <Navigator auth={this.auth}/>
                <div className='body'>

                    <Route
                        path="/"
                        exact
                        render={props => <Home auth={this.auth} {...props} />}
                    />

                    <Route
                        path="/callback"
                        render={props => <Callback auth={this.auth} {...props} />}
                    />

                    <Route
                        path="/profile"
                        render={props =>
                            this.auth.isAuthenticated() ?
                                ( <Profile auth={this.auth} {...props} /> ) :
                                ( <Redirect to='/' /> )}
                    />

                    <Route
                        path="/products"
                        render={props =>
                            this.auth.isAuthenticated() ?
                                ( <GetProducts auth={this.auth} {...props} /> ) :
                                ( <Redirect to='/' /> )}
                    />

                    <Route
                        path="/create"
                        render={props => this.auth.isAuthenticated()
                            ? <CreateProduct auth={this.auth} {...props} />
                            : this.auth.login()}
                    />

                    <Route path='/public' component={Public}/>

                    <Route
                        path="/private"
                        render={props => this.auth.isAuthenticated()
                            ? <Private auth={this.auth} {...props} />
                            : this.auth.login()}
                    />


                </div>
            </>
        );
    }
}

export default App;
