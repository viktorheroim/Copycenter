import React from 'react';

const MainComponent = () => {
    const openProductList = () => {
        const newWindow = window.open('/products', '_blank', 'width=800,height=600');
        if (newWindow) newWindow.opener = null; // предотвращает доступ к родительскому окну
    };

    return (
        <div>
            <h1>Главная страница</h1>
            <button onClick={openProductList}>Открыть список продуктов</button>
        </div>
    );
};

export default MainComponent;