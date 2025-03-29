import React, {useState} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Content2 from "./Content2";
import Content3 from "./Content3";
import Content4 from "./Content4";
import Content5 from "./Content5";
import Content6 from "./Content6";
import Register from "./Register";
import CounterLikes from "./CounterLikes";
import Style from "./Style";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './Modal';


const API_URL = "http://127.0.0.1:8000/api/printphoto/"
const API_URL2 = "http://127.0.0.1:8000/api/services/"
const API_URL3 = "http://127.0.0.1:8000/api/laminating/"
const API_URL4 = "http://127.0.0.1:8000/api/binding/"
const API_URL5 = "http://127.0.0.1:8000/api/printbw/"
const API_URL6 = "http://127.0.0.1:8000/api/printcolour/"

function App() {

    const [Services, setServices] = useState([])

    async function getServices() {
        const response = await axios.get(API_URL2)
        setServices(response.data)
    }

    const [PrintPhoto, setPhoto] = useState([])

    async function getPhoto() {
        const response = await axios.get(API_URL)
        setPhoto(response.data)
    }

    const [Laminating, setLaminating] = useState([])

    async function getLaminating() {
        const response = await axios.get(API_URL3)
        setLaminating(response.data)
    }

    const [Binding, setBinding] = useState([])

    async function getBinding() {
        const response = await axios.get(API_URL4)
        setBinding(response.data)
    }

    const [PrintBW, setPrintBW] = useState([])

    async function getPrintBW() {
        const response = await axios.get(API_URL5)
        setPrintBW(response.data)
    }

    const [PrintColour, setPrintColour] = useState([])

    async function getPrintColour() {
        const response = await axios.get(API_URL6)
        setPrintColour(response.data)
    }


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = async () => {
        await getServices(); // Ждем, пока данные загрузятся
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const openModal2 = async () => {
        await getPhoto(); // Ждем, пока данные загрузятся
        setIsModalOpen2(true);
    };
    const closeModal2 = () => setIsModalOpen2(false);

    const [isModalOpen3, setIsModalOpen3] = useState(false);

    const openModal3 = async () => {
        await getLaminating(); // Ждем, пока данные загрузятся
        setIsModalOpen3(true);
    };
    const closeModal3 = () => setIsModalOpen3(false);

    const [isModalOpen4, setIsModalOpen4] = useState(false);

    const openModal4 = async () => {
        await getBinding(); // Ждем, пока данные загрузятся
        setIsModalOpen4(true);
    };

    const closeModal4 = () => setIsModalOpen4(false);

    const [isModalOpen5, setIsModalOpen5] = useState(false);

    const openModal5 = async () => {
        await getPrintBW(); // Ждем, пока данные загрузятся
        setIsModalOpen5(true);
    };
    const closeModal5 = () => setIsModalOpen5(false);

    const [isModalOpen6, setIsModalOpen6] = useState(false);

    const openModal6 = async () => {
        await getPrintColour(); // Ждем, пока данные загрузятся
        setIsModalOpen6(true);
    };
    const closeModal6 = () => setIsModalOpen6(false);

    return (
        <div className='App'>
            <Register/>
            <Header/>
            <main>
                <div>
                    <button onClick={openModal}>УСЛУГИ</button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <Content Services={Services}/>
                    </Modal>
                </div>
                <div>
                    <button onClick={openModal2}>ПЕЧАТЬ ФОТОГРАФИЙ</button>
                    <Modal isOpen={isModalOpen2} onClose={closeModal2}>
                        <Content2 PrintPhoto={PrintPhoto}/>
                    </Modal>
                </div>
                <div>
                    <button onClick={openModal3}>ЛАМИНИРОВАНИЕ</button>
                    <Modal isOpen={isModalOpen3} onClose={closeModal3}>
                        <Content3 Laminating={Laminating}/>
                    </Modal>
                </div>
                <div>
                    <button onClick={openModal4}>ПЕРЕПЛЕТ</button>
                    <Modal isOpen={isModalOpen4} onClose={closeModal4}>
                        <Content4 Binding={Binding}/>
                    </Modal>
                </div>
                <div>
                    <button onClick={openModal5}>ПЕЧАТЬ ЧЕРНО-БЕЛАЯ</button>
                    <Modal isOpen={isModalOpen5} onClose={closeModal5}>
                        <Content5 PrintBW={PrintBW}/>
                    </Modal>
                </div>
                <div>
                    <button onClick={openModal6}>ПЕЧАТЬ ЦВЕТНАЯ</button>
                    <Modal isOpen={isModalOpen6} onClose={closeModal6}>
                        <Content6 PrintColour={PrintColour}/>
                    </Modal>
                </div>
            </main>
            {/*<CounterLikes/>*/}
            <Style/>
            <Footer/>
        </div>
    )
}

export default App;
