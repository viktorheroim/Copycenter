import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from './Cart';
import Checkout from './Checkout'; // Импортируйте новый компонент
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/productramki/');
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setNotification(`${product.name} уже в корзине.`);
        } else {
            setCart([...cart, product]);
            setNotification(`${product.name} добавлен в корзину!`);
        }
    };

    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
        setNotification("Товар удален из корзины.");
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const clearCart = () => {
        setCart([]);
        setNotification("Корзина очищена.");
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Произошла ошибка: {error.message}</p>;

    return (
        <>
            <button onClick={toggleCart}>
                {isCartOpen ? 'Скрыть корзину' : 'Показать корзину'}
            </button>
            {isCartOpen && (
                <div className="modal">
                    <Cart cart={cart} removeFromCart={removeFromCart} />
                    <button onClick={() => setIsCheckoutOpen(true)}>Оформить заказ</button>
                    <button key="close-cart" onClick={toggleCart}>Закрыть</button>
                </div>
            )}
            {isCheckoutOpen && (
                <Checkout cart={cart} clearCart={clearCart} onClose={() => setIsCheckoutOpen(false)} />
            )}
            {notification && <div className="notification">{notification}</div>}
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} />
                        ) : (
                            <p>Изображение недоступно</p>
                        )}
                        <h3>{product.name}</h3>
                        <p>Цена: {product.price.toFixed(2)} руб.</p>
                        <button onClick={() => addToCart(product)}>В корзину</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductList;