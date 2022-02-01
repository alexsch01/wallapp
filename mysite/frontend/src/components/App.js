import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from './layout/Header';
import ThemeSwitcher from './layout/ThemeSwitcher';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <ThemeSwitcher />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));