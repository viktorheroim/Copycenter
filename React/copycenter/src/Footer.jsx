import React from "react";
import './Styles/Footer.css';

const Footer = () => {
    const year = new Date().getFullYear(); // Получение года один раз

    return (
        <footer className='footer'>
            <h2 className='year'>
                &copy; {year} ГАРИИ ПЛОТТЕР
            </h2>
            <div className='info'>
                <p>г. Гомель, пр-т Победы, 8</p>
                <p>hplotter854@gmail.com</p>
                <p>+37529-603-15-44</p>
            </div>
        </footer>
    );
}

export default Footer;