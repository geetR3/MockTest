
// src/components/Header.js


import React from 'react';
import './Header.css';

const Header = ({ onNavigate }) => {
    return (
        <header className="header">
            <nav className="nav">
                <ul>
                    
       
<a href="/">Home</a>
{/* <a href="/">Mock Tests</a>
<a href="/">Practice Sets</a> */}

                </ul>
            </nav>
        </header>
    );
};

export default Header;
