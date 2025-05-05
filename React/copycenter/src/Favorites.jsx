import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [notification, setNotification] = useState('');

    // Функция для загрузки избранных товаров с сервера
    const fetchFavorites = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/favorite/');
            setFavorites(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке избранных товаров:', error);
        }
    };

    // Функция для удаления товара из избранного
    const removeFromFavorites = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/favorite//${id}`);
            setFavorites(favorites.filter(product => product.id !== id));
            setNotification('Товар удален из избранного.');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error('Ошибка при удалении товара из избранного:', error);
        }
    };

    // Функция для очистки всех избранных товаров
    const clearFavorites = async () => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/favorite/'); // Предполагается, что у вас есть эндпоинт для очистки
            setFavorites([]);
            setNotification('Все избранные товары удалены.');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error('Ошибка при очистке избранного:', error);
        }
    };

    // Загрузка избранных товаров при монтировании компонента
    useEffect(() => {
        fetchFavorites();
    }, []);

    if (favorites.length === 0) {
        return <p>Ваши избранные товары пусты.</p>;
    }

    return (
        <div className="favorites">
            <h2>Избранные товары ({favorites.length})</h2>
            <button onClick={clearFavorites}>Очистить все избранные</button>
            {notification && <p>{notification}</p>}
            <ul>
                {favorites.map(product => (
                    <li key={product.id}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} />
                        <span>{product.name}</span>
                        <button onClick={() => removeFromFavorites(product.id)}>Убрать из избранного</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;