import React, { useEffect } from 'react';

const YandexMap = () => {
    const init = () => {
        const map = new window.ymaps.Map('map', {
            center: [52.433973, 31.004014],
            zoom: 10,
        });

        // Добавление маркера
        const placemark = new window.ymaps.Placemark([52.433973, 31.004014], {
            balloonContent: 'Гарри Плоттер'
        });

        map.geoObjects.add(placemark);
    };

    useEffect(() => {
        const ymapsScript = document.createElement('script');
        ymapsScript.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=d5ab585b-7703-4c30-a733-27c27cabcd44";

        ymapsScript.onload = () => {
            if (window.ymaps) {
                window.ymaps.ready(init);
            }
        };

        ymapsScript.onerror = () => {
            console.error("Ошибка загрузки Yandex Maps API");
        };

        document.body.appendChild(ymapsScript);

        // Очистка
        return () => {
            if (ymapsScript.parentNode) {
                ymapsScript.parentNode.removeChild(ymapsScript);
            }
        };
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '500px' }}></div>
    );
};

export default YandexMap;