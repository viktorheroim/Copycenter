import React from "react";
import LogoutButton from './LogoutButton';
import Login from "./Login";
import Register from "./Register";
import {Link} from 'react-router-dom';
import './Styles/Link.css';
import Comments from "./Comments";

const Header = () => {
    return (
        <header className='header'>
            <div className='header-content'>
                <div className='left-section'>
                    <h1>Гарри Плоттер</h1>
                    <p>Адрес: г.Гомель, проспект Победы, 8</p>
                    <Link className="styled-link" to="/">Главная</Link>
                </div>
                <div className='button-container'>
                    <Register/>
                    <Login/>
                    <LogoutButton/>
                    <Comments/>
                </div>
            </div>
        </header>
    );
};

export default Header;