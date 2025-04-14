import React, { useState } from "react";
import Photo from "./Photo";
import axios from "axios";
import Modal from "./Modal";

const API_URL = "http://127.0.0.1:8000/api/printphoto/";

const ContentPhoto = () => {
    const [printPhotos, setPrintPhotos] = useState([]); // Изменено имя состояния на printPhotos
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const getPhoto = async () => {
        try {
            const response = await axios.get(API_URL);
            setPrintPhotos(response.data);
        } catch (error) {
            console.error("Ошибка при получении фотографий:", error);
        }
    };

    const openModal2 = async () => {
        await getPhoto(); // Ждем, пока данные загрузятся
        setIsModalOpen2(true);
    };

    const closeModal2 = () => setIsModalOpen2(false);

    return (
        <main>
            <div>
                <button onClick={openModal2}>ПЕЧАТЬ ФОТОГРАФИЙ</button>
                <Modal isOpen={isModalOpen2} onClose={closeModal2}>
                    {printPhotos.map(photo => (
                        <Photo photo={photo} key={photo.id} />
                    ))}
                </Modal>
            </div>
        </main>
    );
};

export default ContentPhoto;