import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import ContentService from "./ContentService";
import ContentPhoto from "./ContentPhoto";
import ContentLaminating from "./ContentLaminating";
import ContentBinding from "./ContentBinding";
import ContentPrintBW from "./ContentPrintBW";
import ContentPrintColour from "./ContentPrintColour";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList/ProductList';


function App() {
    return (
        <Router>
            <div className='App'>
                <Header/>
                <main>
                    <ContentService/>
                    <ContentPhoto/>
                    <ContentLaminating/>
                    <ContentBinding/>
                    <ContentPrintBW/>
                    <ContentPrintColour/>
                </main>
                <Routes>
                    {/* Главная страница */}
                    <Route path="/" element={<h1>Добро пожаловать на главную страницу!</h1>}/>
                    {/* Страница с продуктами */}
                    <Route path="/products" element={<ProductList/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;