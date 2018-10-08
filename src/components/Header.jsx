import React from 'react';

export const Header = () => {
    return(
        <header>
            <span className="header__logo">CC Viewer</span>
            <nav className="header__nav">
                <ul className="header__main-menu">
                    <li className="main-menu__item">one</li>
                    <li className="main-menu__item">two</li>
                    <li className="main-menu__item">three</li>
                    <li className="main-menu__item">four</li>
                    <li className="main-menu__item">five</li>
                </ul>
            </nav>
        </header>
    );
};