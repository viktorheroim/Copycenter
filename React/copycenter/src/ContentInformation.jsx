import React, { useState, useEffect } from "react";
import axios from "axios";
import Information from "./Information";
import './Styles/Informations.css';

const API_URL = "http://127.0.0.1:8000/api/information/";

const ContentInformation = () => {
    const [informations, setInformations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getInformations = async () => {
        setLoading(true);
        setError(null); // Сбрасываем ошибку перед новым запросом
        try {
            const response = await axios.get(API_URL);
            setInformations(response.data);
        } catch (error) {
            setError("Ошибка при получении информации.");
            console.error("Ошибка при получении информации:", error);
        } finally {
            setLoading(false);
        }
    };

    // Вызов функции при монтировании компонента
    useEffect(() => {
        getInformations();
    }, []);

    return (
        <div className='information'>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {informations.map(information => (
                <Information information={information} key={information.id} />
            ))}
        </div>
    );
};

export default ContentInformation;