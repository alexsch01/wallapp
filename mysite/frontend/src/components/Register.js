import React, { Component } from 'react';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
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
    if(state.username && state.first_name && state.last_name && state.email && state.password) {
      this.props.handleLogin(1);
    }
  }

  render() {
    return (
      <div>
        Register:
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
        First name:
        <input
          name="first_name"
          type="text"
          value={this.state.first_name}
          onChange={this.handleInputs} />
        </label>
        <br />

        <label>
        Last name:
        <input
          name="last_name"
          type="text"
          value={this.state.last_name}
          onChange={this.handleInputs} />
        </label>
        <br />

        <label>
        Email address:
        <input
          name="email"
          type="text"
          value={this.state.email}
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

        <input type="submit" value="Register" onClick={this.handleSubmit} />
        <input type="submit" value="Click here to login" onClick={this.props.handleLogin} />
      </div>
    );
  }
}

export default Register;
