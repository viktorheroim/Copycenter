import React, {useState, useEffect} from 'react';
import './Styles/Comments.css';

function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия модального окна
    const [errorMessage, setErrorMessage] = useState(''); // Состояние для сообщения об ошибке

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);

        fetch('http://127.0.0.1:8000/api/comments/')
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(error => console.error('Ошибка при загрузке комментариев:', error));
    }, []);

    const handleAddComment = () => {
        const token = localStorage.getItem('access_token');
        if (!token || !isAuthenticated) {
            alert('Только авторизованные могут оставить комментарий!');
            return;
        }

        setLoading(true);
        setErrorMessage(''); // Сбрасываем сообщение об ошибке

        fetch('http://127.0.0.1:8000/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Исправленный синтаксис
            },
            body: JSON.stringify({content: newComment}),
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Ошибка при отправке комментария');
            })
            .then(comment => {
                setComments([...comments, comment]);
                setNewComment('');
                setIsModalOpen(false); // Закрываем модальное окно после отправки
            })
            .catch(error => {
                setErrorMessage(error.message); // Устанавливаем сообщение об ошибке
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Открыть комментарии</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h3>Комментарии</h3>
                        {comments.map(c => (
                            <div key={c.id}>
                                <strong>{c.user}</strong>: {c.content}
                            </div>
                        ))}
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Оставьте комментарий"
                        />
                        <button onClick={handleAddComment} disabled={loading}>
                            {loading ? 'Отправка...' : 'Отправить'}
                        </button>
                        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>} {/* Отображение ошибки */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comments;