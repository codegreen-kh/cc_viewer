import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.sass';

export const Header = () => {
    return(
        <header>
            <NavLink to="/"><span className="header__text">CC Viewer</span></NavLink>
            <nav className="header__nav">
                <ul className="header__main-menu">
                    <li className="header__main-menu__item">
                        <NavLink to="/cryptocurrencies">Cryptocurrencies</NavLink>
                    </li>
                    <li className="header__main-menu__item">
                        <NavLink to="/ohlcv">Historical OHLCV</NavLink>
                    </li>
                    <li className="header__main-menu__item">
                        <NavLink to="/topexchanges">Top exchanges</NavLink>
                    </li>
                    <li className="header__main-menu__item">
                        <NavLink to="/news">News</NavLink>
                    </li>
                    <li className="header__main-menu__item">
                        <NavLink to="/coins">All coins</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};