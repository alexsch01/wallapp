import React, { Component } from 'react';
import axios from 'axios';

export class MakePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
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
            if (cookie.substring(0, "csrftoken".length + 1) === ("csrftoken=")) {
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

    if(state.title && state.content) {
      axios.post('http://localhost:8000/posts/', {
        title: state.title,
        content: state.content,
        username: this.props.username
      }, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      })
      .then(res => {
        this.setState({title: '', content: ''})
        const resData = res.data;
        const newData = {};
        newData.title = resData.title;
        newData.content = resData.content;
        newData.username = resData.username;
        newData.created_at = resData.created_at;
        this.props.makeRequest(newData);
      })
      .catch(err => {
        alert("Failed to make post")
      });
    }
  }

  render() {
    return (
      <div>
        
        Welcome back {this.props.username}!
        <br />
        <br />

        <label>
        Title:
        <input
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleInputs} />
        </label>
        <br />

        <label>
          Message:
          <textarea
            rows="3"
            name="content"
            type="text"
            value={this.state.content}
            onChange={this.handleInputs} />
        <br />
        <br />

        <input type="submit" value="Submit" onClick={this.handleSubmit} />

        </label>
        <br />
        <br />

      </div>
    );
  }
}

export default MakePosts;
