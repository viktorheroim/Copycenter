import React from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart }) => {
    if (cart.length === 0) {
        return <p>Корзина пуста.</p>;
    }

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const formatPrice = (price) => {
        return `${price.toLocaleString('ru-RU')} руб.`; // Исправлено
    };

    const handleRemove = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
            removeFromCart(id);
        }
    };

    return (
        <div className="modal-content">
            <h2>Содержимое корзины</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - {formatPrice(item.price)}
                        <button onClick={() => handleRemove(item.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
            <h3>Общая стоимость: {formatPrice(totalPrice)}</h3>
        </div>
    );
};

export default Cart;