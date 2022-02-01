import React, { Component } from 'react';

export class Header extends Component {
  render() {
    return (
        <div>
            <ul class="breadcrumb">
                <li><a href="#">Home</a> <span class="divider">/</span></li>
                <li><a href="#">Library</a> <span class="divider">/</span></li>
                <li class="active">Data</li>
            </ul>
        </div>
    )
  }
}

export default Header;
