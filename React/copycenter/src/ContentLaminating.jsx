import React, { useState } from "react";
import Laminatlist from "./Laminatlist";
import axios from "axios";
import Modal from "./Modal"; // Убедитесь, что вы импортируете компонент Modal

const API_URL3 = "http://127.0.0.1:8000/api/laminating/";

const ContentLaminating = () => {
    const [laminatingData, setLaminatingData] = useState([]); // Изменено имя состояния на laminatingData
    const [isModalOpen3, setIsModalOpen3] = useState(false);

    const getLaminating = async () => {
        try {
            const response = await axios.get(API_URL3);
            setLaminatingData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных ламинирования:", error);
        }
    };

    const openModal3 = async () => {
        await getLaminating(); // Ждем, пока данные загрузятся
        setIsModalOpen3(true);
    };

    const closeModal3 = () => setIsModalOpen3(false);

    return (
        <main>
            <div>
                <button onClick={openModal3}>ЛАМИНИРОВАНИЕ</button>
                <Modal isOpen={isModalOpen3} onClose={closeModal3}>
                    {laminatingData.map(laminat => (
                        <Laminatlist laminat={laminat} key={laminat.id} />
                    ))}
                </Modal>
            </div>
        </main>
    );
};

export default ContentLaminating;