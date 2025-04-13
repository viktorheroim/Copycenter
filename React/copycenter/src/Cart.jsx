import React from 'react';
import './Cart.css'; // Импортируем стили

const Cart = ({cart, removeFromCart}) => {
    if (cart.length === 0) {
        return <p>Корзина пуста.</p>;
    }

    return (
        <div className="modal-content">
            <h2>Содержимое корзины</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price} руб.
                        <button onClick={() => removeFromCart(index)}>Удалить</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => alert("Заказ оформлен!")}>Оформить заказ</button>
        </div>
    );
};


export default Cart;