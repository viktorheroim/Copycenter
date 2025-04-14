import React, { useState } from "react";
import Service from "./Service";
import axios from "axios";
import Modal from "./Modal"; // Убедитесь, что вы импортируете компонент Modal

const API_URL2 = "http://127.0.0.1:8000/api/services/";

const ContentService = () => {
    const [services, setServices] = useState([]); // Изменено имя состояния на services
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getServices = async () => {
        try {
            const response = await axios.get(API_URL2);
            setServices(response.data);
        } catch (error) {
            console.error("Ошибка при получении услуг:", error);
        }
    };

    const openModal = async () => {
        await getServices(); // Ждем, пока данные загрузятся
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <main>
            <div>
                <button onClick={openModal}>УСЛУГИ</button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {services.map(service => (
                        <Service service={service} key={service.id} />
                    ))}
                </Modal>
            </div>
        </main>
    );
};

export default ContentService;