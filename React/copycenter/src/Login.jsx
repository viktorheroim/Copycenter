import React, {useState} from 'react';
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Сбрасываем предыдущие ошибки
        setSuccessMessage(''); // Сбрасываем предыдущее сообщение успеха

        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
            setSuccessMessage('Вы успешно вошли!');
        } catch (error) {
            setError('Неверные учетные данные');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className='input'
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className='input'
                />
                <button type="submit" className='login'>Войти</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default Login;