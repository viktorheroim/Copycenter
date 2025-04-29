import React, {useState} from 'react';
import './Styles/UserProfile.css';

const EditUserData = ({userData, onSave, onClose}) => {
    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleSave = () => {
        setSaving(true);
        // Тут делаем запрос на сервер для обновления данных
        fetch('http://127.0.0.1:8000/api/profile/update/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({username, email}),
        })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка при сохранении');
                return res.json();
            })
            .then(data => {
                onSave(data); // Передаем обновленные данные назад
                setSaving(false);
                onClose(); // Закрываем модал
            })
            .catch(err => {
                setError(err.message);
                setSaving(false);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Редактировать профиль</h2>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <label>
                    Имя пользователя:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Почта:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br/>
                <button
                    className='user-button'
                    onClick={handleSave} disabled={saving}>
                    {saving ? 'Сохраняем...' : 'Сохранить'}
                </button>
                <button
                    className='user-button'
                    onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};

export default EditUserData;