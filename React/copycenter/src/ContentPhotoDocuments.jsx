import React, { useState } from "react";
import PhotoDocuments from "./PhotoDocuments";
import axios from "axios";
import Modal from "./Modal";

const API_URL = "http://127.0.0.1:8000/api/printphotodocuments/";

const ContentPhotoDocuments = () => {
    const [printPhotosDocuments, setPrintPhotosDocuments] = useState([]);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const getPhotoDocuments = async () => {
        try {
            const response = await axios.get(API_URL);
            setPrintPhotosDocuments(response.data);
        } catch (error) {
            console.error("Ошибка при получении фотографий:", error);
        }
    };

    const openModal2 = async () => {
        await getPhotoDocuments(); // Ждем, пока данные загрузятся
        setIsModalOpen2(true);
    };

    const closeModal2 = () => setIsModalOpen2(false);

    return (
        <main>
            <div>
                <button onClick={openModal2}>ФОТО НА ДОКУМЕНТЫ</button>
                <Modal isOpen={isModalOpen2} onClose={closeModal2}>
                    {printPhotosDocuments.map(photo => (
                        <PhotoDocuments photo={photo} key={photo.id} />
                    ))}
                </Modal>
            </div>
        </main>
    );
};

export default ContentPhotoDocuments;