import React from "react";

const PhotoDocuments = (props) => {
    return (
        <div className='photo'>
            <div>{props.photo.id}. Бумага: {props.photo.paper}</div>
            <div>Формат: {props.photo.format}</div>
            <div>Цена: {props.photo.price} руб.</div>
        </div>
    )
}

export default PhotoDocuments