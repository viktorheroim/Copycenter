import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cart from '../Cart';
import Checkout from '../Checkout';
import './ProductList.css';

const ProductRamki = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [notification, setNotification] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    // Расчет товаров для текущей страницы
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setNotification(`${product.name} уже в корзине.`);
        } else {
            setCart([...cart, product]);
            setNotification(`${product.name} добавлен в корзину!`);
        }
        // Автоматически скрываем уведомление через 3 секунды
        setTimeout(() => setNotification(''), 3000);
    };

    const removeFromCart = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
        setNotification("Товар удален из корзины.");
        setTimeout(() => setNotification(''), 3000);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const clearCart = () => {
        setCart([]);
        setNotification("Корзина очищена.");
        setTimeout(() => setNotification(''), 3000);
    };

    const handleCheckout = () => {
        // Закрываем корзину при оформлении заказа
        setIsCartOpen(false);
        setIsCheckoutOpen(true); // Открываем окно оформления заказа
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Произошла ошибка: {error.message}</p>;

    return (
        <>
            <button
                className="cart-button"
                onClick={toggleCart}>
                {isCartOpen ? 'Скрыть корзину' : 'Показать корзину'}
            </button>
            {isCartOpen && (
                <div className="modal-content">
                    <Cart cart={cart} removeFromCart={removeFromCart}/>
                    <button
                        className="cart-button"
                        onClick={handleCheckout}>Оформить заказ
                    </button>
                    <button
                        className="cart-button"
                        key="close-cart" onClick={toggleCart}>Закрыть
                    </button>
                </div>
            )}
            {isCheckoutOpen && (
                <Checkout cart={cart} clearCart={clearCart} onClose={() => setIsCheckoutOpen(false)}/>
            )}
            {notification && <div className="notification">{notification}</div>}
            <div className="product-grid">
                {paginatedProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name}/>
                        ) : (
                            <p>Изображение недоступно</p>
                        )}
                        <h3>{product.name}</h3>
                        <p>Цена: {product.price.toFixed(2)} руб.</p>
                        <button onClick={() => addToCart(product)}>В корзину</button>
                    </div>
                ))}
            </div>
            <div className="pagination-controls">
                <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>
                <span>Страница {currentPage}</span>
                <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage * itemsPerPage >= products.length}
                >
                    Вперед
                </button>
            </div>
        </>
    );
};

export default ProductRamki;