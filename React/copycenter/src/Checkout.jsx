import React, { useState } from 'react';
import axios from 'axios';
import './ProductList/ProductList.css';

const Checkout = ({ cart, clearCart, onClose }) => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Проверка заполненности полей
        if (!address || !phone) {
            setError('Пожалуйста, заполните все поля.');
            setLoading(false);
            return;
        }

        try {
            const orderData = {
                address,
                phone,
                products: cart,
            };

            console.log('Sending order data:', orderData);

            // Получение токена из localStorage
            const token = localStorage.getItem('access_token');

            // Отправка запроса с заголовком авторизации
            await axios.post('http://127.0.0.1:8000/api/orders/', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
                },
            });

            setSuccess(true);
            clearCart();
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Order submission error:', err);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Ошибка при оформлении заказа. Попробуйте еще раз.');
            } else {
                setError('Ошибка при оформлении заказа. Попробуйте еще раз.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Проверка наличия токена
    const token = localStorage.getItem('access_token');
    if (!token) {
        return (
            <div className="checkout-modal">
                <h2>Оформление заказа</h2>
                <p>Пожалуйста, войдите в свою учетную запись, чтобы оформить заказ.</p>
                <button type="button" onClick={onClose}>Закрыть</button>
            </div>
        );
    }

    return (
        <div className="checkout-modal">
            <h2>Оформление заказа</h2>
            {success && <p className="success-message">Заказ успешно оформлен!</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Адрес доставки"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Номер телефона"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button
                    className='cart-button'
                    type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Подтвердить заказ'}
                </button>
                <button
                    className='cart-button'
                    type="button" onClick={onClose}>Закрыть
                </button>
            </form>
        </div>
    );
};

export default Checkout;