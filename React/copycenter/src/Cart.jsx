import React from 'react';
import './Cart.css'; // Импортируем стили

const Cart = ({ cart, removeFromCart }) => {
    if (cart.length === 0) {
        return <p>Корзина пуста.</p>;
    }

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const formatPrice = (price) => {
        return `${price.toLocaleString('ru-RU')} руб.`;
    };

    return (
        <div className="modal-content">
            <h2>Содержимое корзины</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - {formatPrice(item.price)}
                        <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
            <h3>Общая стоимость: {formatPrice(totalPrice)}</h3>
        </div>
    );
};

export default Cart;