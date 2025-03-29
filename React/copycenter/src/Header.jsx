import React from "react";
import LogoutButton from './LogoutButton';
import Login from "./Login";


const Header = () => {
    return (
        <header className='header'>
            <div className='header-content'>
                <img src={`${process.env.PUBLIC_URL}/Логотип.jpg`} alt="Логотип" className='logo'/>
                <div className='left-section'>
                    <h1>Гарри Плоттер</h1>
                    <p>Адрес: г. Гомель, проспект Победы, 8</p>
                    <p>+375 29 603 15 44</p>
                </div>
                <nav className='nav-links'>
                    <ul>
                        <li>
                            <div className='login-container'>
                                <Login/>
                                <LogoutButton/>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;