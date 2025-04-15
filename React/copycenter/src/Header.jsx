import React from "react";
import LogoutButton from './LogoutButton';
import Login from "./Login";
import Register from "./Register";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <div className='header-content'>
                <div className='left-section'>
                    <h1>Гарри Плоттер</h1>
                    <p>Адрес: г.Гомель, проспект Победы, 8</p>
                </div>
                <div className='button-container'>
                    <Register/>
                    <Login/>
                    <LogoutButton/>
                </div>
            </div>
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/products">Продукты</Link>
            </nav>
        </header>
    );
};

export default Header;