import React, { Component } from "react";
import ReactDOM from "react-dom";

import Login from './components/Login';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Register from "./components/Register";
import MakePosts from "./components/MakePosts";
import Wall from "./components/Wall";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          goToLogin: false,
          goToRegister: false,
          loggedIn: false,
          registeredSuccess: false,
        };
    }

    registerScreen() {
        this.setState({goToLogin: false, goToRegister: true});
    }

    loginScreen(num) {
        this.setState({goToLogin: true, goToRegister: false});
        if(num == 1) {
            this.setState({registeredSuccess: true});
        } else {
            this.setState({registeredSuccess: false});
        }
    }

    finishLogin() {
        this.setState({goToLogin: false, goToRegister: false, loggedIn: true});
    }

    finishLogout() {
        this.setState({goToLogin: false, goToRegister: false, loggedIn: false});
    }

    render() {
        return (
            <div>
                {!this.state.goToLogin && !this.state.goToRegister && this.state.loggedIn ? (
                    <div>
                        <LogoutButton handleClick={this.finishLogout.bind(this)} />
                        <MakePosts />
                        <Wall />
                    </div>
                ) : !this.state.goToLogin && !this.state.goToRegister && !this.state.loggedIn ? (
                    <div>
                        <LoginButton handleClick={this.loginScreen.bind(this)} />
                        <Wall />
                    </div>
                ) : this.state.goToLogin && !this.state.goToRegister ? (
                    <div>
                        {this.state.registeredSuccess && <div>
                            Registered successful!
                            <br />
                            <br />
                        </div>} 
                        <Login 
                            handleRegister={this.registerScreen.bind(this)}
                            finishLogin={this.finishLogin.bind(this)}
                        />
                     </div>
                ) : (
                    <Register handleLogin={this.loginScreen.bind(this)}/> 
                )}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));