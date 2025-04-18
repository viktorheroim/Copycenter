import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ModalStyles.css';

Modal.setAppElement('#root');

const Login = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
            setSuccessMessage('Вы успешно вошли!');
            closeModal(); // Закрываем модальное окно при успешном входе
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Неверные учетные данные');
            } else {
                setError('Произошла ошибка. Попробуйте снова.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={openModal}>{successMessage || 'Вход пользователя'}</button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Login Modal">
                <h2>Вход</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Имя пользователя"
                        required
                        className='input'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                        required
                        className='input'
                    />
                    <button type="submit" className='login' disabled={loading}>
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
                <button onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>
    );
};

export default Login;