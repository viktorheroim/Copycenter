import React, { useState } from "react";
import PrintColourL from "./PrintColourL";
import Modal from "./Modal";
import axios from "axios";

const API_URL6 = "http://127.0.0.1:8000/api/printcolour/";

const ContentPrintColour = () => {
    const [printColours, setPrintColours] = useState([]); // Изменено имя состояния
    const [isModalOpen6, setIsModalOpen6] = useState(false);

    async function getPrintColour() {
        try {
            const response = await axios.get(API_URL6);
            setPrintColours(response.data); // Обновляем состояние с полученными данными
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }

    const openModal6 = async () => {
        await getPrintColour(); // Ждем, пока данные загрузятся
        setIsModalOpen6(true);
    };

    const closeModal6 = () => setIsModalOpen6(false);

    return (
        <main>
            <div>
                <button onClick={openModal6}>ПЕЧАТЬ ЦВЕТНАЯ</button>
                <Modal isOpen={isModalOpen6} onClose={closeModal6}>
                    {printColours.map(printcol => (
                        <PrintColourL printcol={printcol} key={printcol.id} />
                    ))}
                </Modal>
            </div>
        </main>
    );
};

export default ContentPrintColour;