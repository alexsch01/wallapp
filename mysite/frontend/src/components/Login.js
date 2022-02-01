import React, { Component } from 'react';

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
      alert("You did it!");
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
        <input type="submit" value="Click here to register" onClick={this.props.handleRegister} />
      </div>
    );
  }
}

export default Login;
