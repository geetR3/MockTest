// src/components/Header.js

import React from 'react';
import './Header.css';

const Header = ({ onNavigate }) => {
    return (
        <header className="header">
            <nav className="nav">
                <ul>
                    {/* Home, Mock Tests, aur Practice Sets ke liye links */}
                    <li><a href="#" onClick={() => onNavigate('home')}>Home</a></li>
                    <li><a href="#" onClick={() => onNavigate('mockTests')}>Mock Tests</a></li>
                    <li><a href="#" onClick={() => onNavigate('practiceSets')}>Practice Sets</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;