import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Styles/OrderHistory.css';

const OrderHistory = ({currentUser}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setOrders([]); // Очистка заказов при закрытии модального окна
        setError(null); // Сброс ошибки
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('access_token'); // Получение токена из localStorage
                const response = await axios.get('http://127.0.0.1:8000/api/orders/?user=${currentUser.id}', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Добавление токена в заголовок
                    },
                });
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Ошибка при загрузке истории заказов. Попробуйте еще раз позже.');
            } finally {
                setLoading(false);
            }
        };

        if (isModalOpen) {
            fetchOrders();
        }
    }, [isModalOpen, currentUser]);

    return (
        <div>
            <button
                className='history-button'
                onClick={openModal}>
                История заказов
            </button>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false}>
                <h2>История заказов</h2>
                {loading ? (
                    <p>Загрузка истории заказов...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : orders.length === 0 ? (
                    <p>У вас нет заказов</p>
                ) : (
                    <ul>
                        {orders.map((order) => (
                            <li key={order.id}>
                                <h3>Заказ #{order.id}</h3>
                                <ul>
                                    {order.products.map((product, index) => (
                                        <li key={index}>{product.name} - {product.quantity}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    className='history-button'
                    onClick={closeModal}>
                    Закрыть
                </button>
            </Modal>
        </div>
    );
};

export default OrderHistory;