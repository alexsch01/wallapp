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

        const sessionUser = localStorage.getItem("user");
        if(sessionUser) {
            const myUser = JSON.parse(sessionUser);

            axios.get(window.location.href + 'users/')
                .then(res => {
                    const data = res.data;
                    const index = data.findIndex(obj => obj.username == myUser.username);
                    if(index == -1) {
                        localStorage.setItem('user',JSON.stringify({
                            goToLogin: false,
                            goToRegister: false,
                            username: '',
                            loggedIn: false
                        }))

                        this.state = {
                            goToLogin: false,
                            goToRegister: false,
                            loggedIn: false,
                            registeredSuccess: false,
                            userData: {},
                            postData: {}
                        };
                    }
                })
            .catch(err => {                    
                localStorage.setItem('user',JSON.stringify({
                    goToLogin: false,
                    goToRegister: false,
                    username: '',
                    loggedIn: false
                }))

                this.state = {
                    goToLogin: false,
                    goToRegister: false,
                    loggedIn: false,
                    registeredSuccess: false,
                    userData: {},
                    postData: {}
                };
            });

            if(myUser.loggedIn === true) {

                this.state = {
                    goToLogin: myUser.goToLogin,
                    goToRegister: myUser.goToRegister,
                    loggedIn: myUser.loggedIn,
                    registeredSuccess: false,
                    userData: {
                        email: "",
                        first_name: "",
                        last_name: "",
                        password: "",
                        username: myUser.username,
                    },
                    postData: {}
                };
                
            } else {
                this.state = {
                    goToLogin: false,
                    goToRegister: false,
                    loggedIn: false,
                    registeredSuccess: false,
                    userData: {},
                    postData: {}
                };
            }
        } else {
            this.state = {
                goToLogin: false,
                goToRegister: false,
                loggedIn: false,
                registeredSuccess: false,
                userData: {},
                postData: {}
            };
        }
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

    finishLogin(userData) {
        localStorage.setItem('user',JSON.stringify({
            goToLogin: false,
            goToRegister: false,
            username: userData.username,
            loggedIn: true
        }))
        this.setState({goToLogin: false, goToRegister: false, loggedIn: true, userData});
    }

    finishLogout() {
        localStorage.setItem('user',JSON.stringify({
            goToLogin: false,
            goToRegister: false,
            username: '',
            loggedIn: false
        }))
        this.setState({goToLogin: false, goToRegister: false, loggedIn: false, userData: {}, postData: {}});
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
                            username={this.state.userData.username}
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