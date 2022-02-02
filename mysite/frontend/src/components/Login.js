import React, { Component } from 'react';
import axios from 'axios';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputs(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const state = this.state;
    if(state.username && state.password) {
      axios.get('http://localhost:8000/users/')
      .then(res => {
        const data = res.data;
        const index = data.findIndex(obj => obj.username == state.username && obj.password == state.password);
        if(index != -1) {
          this.props.finishLogin(data[index]);
        } else {
          alert("Invalid credentials");
        }
      })
      .catch(err => {
        alert("Can't read database")
      });
    }
  }

  render() {
    return (
      <div>
        Login:
        <br />
        <br />

        <label>
        Username:
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleInputs} />
        </label>
        <br />

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputs} />
        </label>
        <br />

        <input type="submit" value="Login" onClick={this.handleSubmit} />
        <input type="submit" value="Click here to register" onClick={this.props.goToRegister} />
      </div>
    );
  }
}

export default Login;
