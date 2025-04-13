import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ModalStyles.css';

Modal.setAppElement('#root');

const Register = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        // Сброс значений при открытии модального окна
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setError('');
        setSuccessMessage('');
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password,
                email,
            });
            setSuccessMessage('Вы успешно зарегистрированы!');
            closeModal(); // Закрываем модальное окно при успешной регистрации
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Ошибка регистрации. Попробуйте снова.');
            } else {
                setError('Произошла ошибка. Попробуйте снова.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={openModal}>Регистрация</button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Register Modal">
                <h2>Регистрация</h2>
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
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Подтвердите пароль"
                        required
                        className='input'
                    />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Почта"
                        required
                        className='input'
                    />
                    <button type="submit" className='register' disabled={loading}>
                        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                    {error && <p className='error-message' style={{color: 'red'}}>{error}</p>}
                    {successMessage && <p className='success-message' style={{color: 'green'}}>{successMessage}</p>}
                </form>
                <button onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>
    );
};

export default Register;
