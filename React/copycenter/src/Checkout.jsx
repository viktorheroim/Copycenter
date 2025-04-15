import React, {useState} from 'react';
import axios from 'axios';

const Checkout = ({cart, clearCart, onClose}) => {
    const [name, setName] = useState('');
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
        if (!name || !address || !phone) {
            setError('Пожалуйста, заполните все поля.');
            setLoading(false);
            return;
        }

        try {
            const orderData = {
                name,
                address,
                phone,
                products: cart,
            };

            console.log('Sending order data:', orderData); // Логируем данные заказа

            await axios.post('http://127.0.0.1:8000/api/orders/', orderData);

            setSuccess(true);
            clearCart();
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Order submission error:', err); // Логируем ошибку
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Ошибка при оформлении заказа. Попробуйте еще раз.');
            } else {
                setError('Ошибка при оформлении заказа. Попробуйте еще раз.');
            }
        } finally {
            setLoading(false); // Убедитесь, что загрузка завершена
        }
    };

    return (
        <div className="checkout-modal">
            <h2>Оформление заказа</h2>
            {success && <p>Заказ успешно оформлен!</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Подтвердить заказ'}
                </button>
                <button type="button" onClick={onClose}>Закрыть</button>
            </form>
        </div>
    );
};

export default Checkout;