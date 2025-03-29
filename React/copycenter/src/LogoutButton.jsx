import React, {useState} from 'react';


const LogoutButton = () => {
    const [message, setMessage] = useState('');

    const handleLogout = (event) => {
        event.preventDefault(); // предотвращаем перезагрузку страницы
        localStorage.removeItem('access_token'); // удаляем токен из localStorage

        // Устанавливаем сообщение об успешном выходе
        setMessage('Вы вышли из системы');

        // Перенаправляем пользователя через 2 секунды
        setTimeout(() => {
            window.location.href = ''; // замените на ваш путь к странице входа
        }, 2000);
    };

    return (
        <div>
            <form onSubmit={handleLogout}>
                <button type="submit" className='logout'>
                    Выйти
                </button>
            </form>
            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
        </div>
    );
};

export default LogoutButton;