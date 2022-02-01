import { Button } from 'react-bootstrap';
import React, { Component } from 'react';

export class LogoutButton extends Component {

  render() {
    return (
        <Button onClick={this.props.handleClick}>Logout</Button>
    );
  }
}

export default LogoutButton;
