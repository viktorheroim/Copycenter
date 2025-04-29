import React, {useState, useEffect} from 'react';
import './Styles/Comments.css';

function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage('');

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
                setComments(prevComments => [...prevComments, comment]); // Используем предыдущее состояние
                setNewComment('');
                setIsModalOpen(false); // Закрываем модальное окно после отправки
            })
            .catch(error => {
                setErrorMessage(error.message);
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <button
                className='comments-button'
                onClick={() => setIsModalOpen(true)}>Комментарии</button>

            {isModalOpen && (
                <div className="modall">
                    <div className="modall-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h3>Комментарии</h3>
                        {comments.map(c => (
                            <div key={c.id} className="comment">
                                <strong>{c.user}</strong>: {c.content}
                            </div>
                        ))}
                        <textarea
                            className="comment-input"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Оставьте комментарий"
                        />
                        <button onClick={handleAddComment} disabled={loading}>
                            {loading ? 'Отправка...' : 'Отправить'}
                        </button>
                        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comments;