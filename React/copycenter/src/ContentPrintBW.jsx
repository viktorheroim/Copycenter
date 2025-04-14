import React, { useState } from "react";
import PrintBWlist from "./PrintBWlist";
import axios from "axios";
import Modal from "./Modal";

const API_URL5 = "http://127.0.0.1:8000/api/printbw/";

const ContentPrintBW = () => {
    const [printBWData, setPrintBWData] = useState([]); // Изменено имя состояния на printBWData
    const [isModalOpen5, setIsModalOpen5] = useState(false);

    const getPrintBW = async () => {
        try {
            const response = await axios.get(API_URL5);
            setPrintBWData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных печати черно-белой:", error);
        }
    };

    const openModal5 = async () => {
        await getPrintBW(); // Ждем, пока данные загрузятся
        setIsModalOpen5(true);
    };

    const closeModal5 = () => setIsModalOpen5(false);

    return (
        <main>
            <div>
                <button onClick={openModal5}>ПЕЧАТЬ ЧЕРНО-БЕЛАЯ</button>
                <Modal isOpen={isModalOpen5} onClose={closeModal5}>
                    {printBWData.map(printbw => (
                        <PrintBWlist printbw={printbw} key={printbw.id} />
                    ))}
                </Modal>
            </div>
        </main>
    );
};

export default ContentPrintBW;