import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Простейшая валидация
        if (!username || !password || !email) {
            setError('Все поля обязательны для заполнения.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password,
                email,
            });
            console.log(response.data);
            // Очистка полей после успешной регистрации
            setUsername('');
            setPassword('');
            setEmail('');
            // Здесь можно добавить логику для успешной регистрации
        } catch (error) {
            console.error("There was an error!", error);
            setError('Ошибка регистрации. Попробуйте еще раз.');
        } finally {
            setLoading(false);
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div>
            <button onClick={toggleFormVisibility} className='register'>
                {isFormVisible ? 'Скрыть форму' : 'РЕГИСТРАЦИЯ'}
            </button>

            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className='input'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className='input'
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className='input'
                    />
                    <button type="submit" disabled={loading} className='registered'>
                        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            )}
        </div>
    );
};

export default Register;