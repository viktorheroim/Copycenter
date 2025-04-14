import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import ContentService from "./ContentService";
import ContentPhoto from "./ContentPhoto";
import ContentLaminating from "./ContentLaminating";
import ContentBinding from "./ContentBinding";
import ContentPrintBW from "./ContentPrintBW";
import ContentPrintColour from "./ContentPrintColour";
import CounterLikes from "./CounterLikes";
import Style from "./Style";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';


function App() {

    return (
        <div className='App'>
            <Header/>
            <main>
                <ContentService/>
                <ContentPhoto/>
                <ContentLaminating/>
                <ContentBinding/>
                <ContentPrintBW/>
                <ContentPrintColour/>
                <ProductList/>
            </main>
            {/*<CounterLikes/>*/}
            {/*<Style/>*/}
            <Footer/>
        </div>
    )
}

export default App;
