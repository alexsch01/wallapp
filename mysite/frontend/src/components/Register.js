import React, { Component } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

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
    this.getCsrfToken = this.getCsrfToken.bind(this);
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

  getCsrfToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, "csrftoken".length + 1) === ("csrftoken" + '=')) {
                cookieValue = decodeURIComponent(cookie.substring("csrftoken".length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  handleSubmit() {
    const state = this.state;
    const csrftoken = this.getCsrfToken();
    if(state.username && state.first_name && state.last_name && state.email && state.password) {
      axios.post(window.location.href + 'users/', {
        username: state.username,
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        password: state.password
      }, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      })
      .then(res => {
        emailjs.send('service_k28m3ls', 'template_4vraej9', {
          first_name: state.first_name,
          last_name: state.last_name,
          email: state.email
        }, 'user_pgAPKvFG2q6RXDpLsiGzW')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });

        this.props.goToLogin(1);
      })
      .catch(err => {
        alert(err)
      });
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
        <input type="submit" value="Click here to login" onClick={() => this.props.goToLogin(0)} />
      </div>
    );
  }
}

export default Register;
