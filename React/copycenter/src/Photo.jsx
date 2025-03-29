import React from "react";

const Photo = (props) => {
    return (
        <div className='photo'>
            <div>{props.photo.id}. Бумага: {props.photo.paper}</div>
            <div>Формат: {props.photo.format}</div>
            <div>Цена: {props.photo.price} руб.</div>
        </div>
    )
}

export default Photo