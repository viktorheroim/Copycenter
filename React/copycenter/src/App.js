import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import ContentService from "./ContentService";
import ContentPhoto from "./ContentPhoto";
import ContentPhotoDocuments from "./ContentPhotoDocuments";
import ContentLaminating from "./ContentLaminating";
import ContentBinding from "./ContentBinding";
import ContentPrintBW from "./ContentPrintBW";
import ContentPrintColour from "./ContentPrintColour";
import 'bootstrap/dist/css/bootstrap.min.css';
import Comments from "./Comments";
import ProductRamki from './ProductList/ProductRamki';
import ProductAlbum from "./ProductList/ProductAlbum";
import YandexMap from "./YandexMap";

function App() {
    return (
        <Router>
            <div className='App'>
                <Header/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <main>
                                <Comments/>
                                <ContentService/>
                                <ContentPhoto/>
                                <ContentPhotoDocuments/>
                                <ContentLaminating/>
                                <ContentBinding/>
                                <ContentPrintBW/>
                                <ContentPrintColour/>
                            </main>
                        }
                    />
                    <Route path="/productramki" element={<ProductRamki/>}/>
                    <Route path="/productalbum" element={<ProductAlbum/>}/>
                    <Route path="/locations" element={<YandexMap/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;