import React, { useEffect, useState } from 'react';
import OrderHistory from "./OrderHistory";

const UserProfileModal = ({ isOpen, onClose, userData }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Кабинет пользователя</h2>
                {userData ? (
                    <>
                        <p>Имя пользователя: {userData.username}</p>
                        <p>Почта: {userData.email}</p>
                        <OrderHistory/>
                    </>
                ) : (
                    <p>Данные пользователя отсутствуют.</p>
                )}
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Проверяем наличие токена для авторизации
        const token = localStorage.getItem('access_token');
        if (token) {
            fetch('http://127.0.0.1:8000/api/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Исправлено: добавлены обратные кавычки
                },
            })
                .then(res => {
                    if (!res.ok) throw new Error('Ошибка загрузки данных');
                    return res.json();
                })
                .then(data => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            // Если токена нет, просто завершаем загрузку
            setLoading(false);
        }
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) return <div>Загружаем...</div>;
    if (error) return <div>{error}</div>;

    // Получаем токен для проверки авторизации
    const token = localStorage.getItem('access_token');

    return (
        <div>
            {/* Отображаем кнопку только если пользователь вошел в систему */}
            {token && (
                <button onClick={openModal}>Кабинет пользователя</button>
            )}
            <UserProfileModal isOpen={isModalOpen} onClose={closeModal} userData={userData} />
        </div>
    );
};

export default UserProfile;