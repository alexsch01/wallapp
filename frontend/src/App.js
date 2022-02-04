import React, { Component } from "react";

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
            username: '',
            postData: {}
        };
    }

    registerScreen() {
        this.setState({goToLogin: false, goToRegister: true});
    }

    loginScreen(num) {
        this.setState({goToLogin: true, goToRegister: false});
        if(num === 1) {
            this.setState({registeredSuccess: true});
        } else {
            this.setState({registeredSuccess: false});
        }
    }

    finishLogin(username) {
        this.setState({goToLogin: false, goToRegister: false, loggedIn: true, username});
    }

    finishLogout() {
        this.setState({goToLogin: false, goToRegister: false, loggedIn: false, username: '', postData: {}});
    }

    makeRequest(newData) {
        this.setState({postData: newData});
    }

    guestMode() {
        this.setState({goToLogin: false, goToRegister: false});
    }

    render() {
        return (
            <div className="App">
                {!this.state.goToLogin && !this.state.goToRegister && this.state.loggedIn ? (
                    <div>
                        <h1 className="myTitle">Wall App</h1>
                        <LogoutButton handleClick={this.finishLogout.bind(this)} />
                        <MakePosts
                            username={this.state.username}
                            makeRequest={this.makeRequest.bind(this)}
                        />
                        <Wall postData={this.state.postData} />
                    </div>
                ) : !this.state.goToLogin && !this.state.goToRegister && !this.state.loggedIn ? (
                    <div>
                        <h1 className="myTitle">Wall App</h1>
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
                            goToRegister={this.registerScreen.bind(this)}
                            finishLogin={this.finishLogin.bind(this)}
                            guestMode={this.guestMode.bind(this)}
                        />
                     </div>
                ) : (
                    <Register
                        goToLogin={this.loginScreen.bind(this)}
                        guestMode={this.guestMode.bind(this)}
                    /> 
                )}
            </div>
        )
    }
}

export default App;
