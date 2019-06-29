import React, { Component } from 'react';
import { Menu } from 'element-react';
import './NavBar.css';

class NavBar extends Component {


    render() {
        return (
            <Menu className="main-navbar" mode="vertical" theme="dark">
                <Menu.Item index="1" className="home-button">
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavBar;