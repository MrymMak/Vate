import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="home">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="settings">
                <Link to="/settings">Settings</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;