import React, { Component } from "react";
import ReactDOM from "react-dom";

import Login from './components/Login';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Register from "./components/Register";
import MakePosts from "./components/MakePosts";
import Wall from "./components/Wall";

import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        const username = localStorage.getItem("username");
        if(username) {
            axios.get(window.location.href + 'users/')
                .then(res => {
                    const data = res.data;
                    const index = data.findIndex(obj => obj.username == username);
                    if(index == -1) {
                        localStorage.setItem('username','');

                        this.state = {
                            goToLogin: false,
                            goToRegister: false,
                            loggedIn: false,
                            registeredSuccess: false,
                            username: '',
                            postData: {}
                        };
                    } else {
                        localStorage.setItem('username',username);

                        this.state = {
                            goToLogin: false,
                            goToRegister: false,
                            loggedIn: true,
                            registeredSuccess: false,
                            username,
                            postData: {}
                        };
                    }
                })
                .catch(err => {                    
                    localStorage.setItem('username', '');

                    this.state = {
                        goToLogin: false,
                        goToRegister: false,
                        loggedIn: false,
                        registeredSuccess: false,
                        username: '',
                        postData: {}
                    };
                });

            if(username != "") {

                localStorage.setItem('username',username);

                this.state = {
                    goToLogin: false,
                    goToRegister: false,
                    loggedIn: true,
                    registeredSuccess: false,
                    username,
                    postData: {}
                };
                
            } else {
                localStorage.setItem('username', '');

                this.state = {
                    goToLogin: false,
                    goToRegister: false,
                    loggedIn: false,
                    registeredSuccess: false,
                    username: '',
                    postData: {}
                };
            }

        } else {
            localStorage.setItem('username', '');

            this.state = {
                goToLogin: false,
                goToRegister: false,
                loggedIn: false,
                registeredSuccess: false,
                username: '',
                postData: {}
            };
        }
        console.log(this.state)
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

    finishLogin(username) {
        localStorage.setItem('username', username);
        this.setState({goToLogin: false, goToRegister: false, loggedIn: true, username});
    }

    finishLogout() {
        localStorage.setItem('username','');
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
            <div>
                {!this.state.goToLogin && !this.state.goToRegister && this.state.loggedIn ? (
                    <div>
                        <LogoutButton handleClick={this.finishLogout.bind(this)} />
                        <MakePosts
                            username={this.state.username}
                            makeRequest={this.makeRequest.bind(this)}
                        />
                        <Wall postData={this.state.postData} />
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

ReactDOM.render(<App />, document.getElementById('app'));