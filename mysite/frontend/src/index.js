import React, { Component } from "react";
import ReactDOM from "react-dom";

import Login from './components/Login';
import Register from "./components/Register";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          goToLogin: true
        };
    }

    registerScreen() {
        this.setState({goToLogin: false});
    }

    loginScreen() {
        this.setState({goToLogin: true});
    }

    render() {
        return (
            <div>
                {this.state.goToLogin ? (
                    <Login handleRegister={this.registerScreen.bind(this)}/>
                ) : (
                    <Register handleLogin={this.loginScreen.bind(this)}/>
                )}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));