import React, { useState, useEffect } from 'react';

const LogoutButton = () => {
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Проверяем наличие токена при монтировании компонента
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = (event) => {
        event.preventDefault(); // предотвращаем перезагрузку страницы
        localStorage.removeItem('access_token'); // удаляем токен из localStorage
        localStorage.removeItem('username'); // удаляем username из localStorage
        setIsLoggedIn(false); // обновляем состояние входа
        setMessage('Вы вышли из системы');

        // Перенаправляем через 2 секунды
        setTimeout(() => {
            window.location.href = ''; // замените на ваш путь к странице входа
        }, 2000);
    };

    if (!isLoggedIn) {
        return null; // не отображать кнопку, если не вошли
    }

    return (
        <div>
            <form onSubmit={handleLogout}>
                <button type="submit" className='logout'>
                    {message || 'Выйти'}
                </button>
            </form>
        </div>
    );
};

export default LogoutButton;