import React, { useState } from "react";
import Bind from "./Bind";
import axios from "axios";
import Modal from "./Modal"; // Убедитесь, что вы импортируете компонент Modal

const API_URL4 = "http://127.0.0.1:8000/api/binding/";

const ContentBinding = () => {
    const [bindingData, setBindingData] = useState([]); // Изменено имя состояния на bindingData
    const [isModalOpen4, setIsModalOpen4] = useState(false);

    const getBinding = async () => {
        try {
            const response = await axios.get(API_URL4);
            setBindingData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных переплета:", error);
        }
    };

    const openModal4 = async () => {
        await getBinding(); // Ждем, пока данные загрузятся
        setIsModalOpen4(true);
    };

    const closeModal4 = () => setIsModalOpen4(false);

    return (
        <main>
            <div>
                <button onClick={openModal4}>ПЕРЕПЛЕТ</button>
                <Modal isOpen={isModalOpen4} onClose={closeModal4}>
                    {bindingData.map(bind => (
                        <Bind bind={bind} key={bind.id} />
                    ))}
                </Modal>
            </div>
        </main>
    );
};

export default ContentBinding;