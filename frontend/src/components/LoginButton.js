import { Button } from 'react-bootstrap';
import React, { Component } from 'react';

export class LoginButton extends Component {

  render() {
    return (
      <div>
        <Button onClick={() => this.props.handleClick(0)}>Login</Button>
        <br />
        <br />
      </div>
    );
  }
}

export default LoginButton;
