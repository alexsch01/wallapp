import { Button } from 'react-bootstrap';
import React, { Component } from 'react';

export class LogoutButton extends Component {

  render() {
    return (
      <div>
        <Button onClick={this.props.handleClick}>Logout</Button>
        <br />
        <br />
      </div>
    );
  }
}

export default LogoutButton;
