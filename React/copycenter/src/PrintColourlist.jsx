import React from "react";

const PrintColourlist = (props) => {
    return (
        <div className='printcolour'>
            <div>{props.printcolour.id}. Формат: {props.printcolour.format}</div>
            <div>Цена: {props.printcolour.price} руб.</div>
        </div>
    )
}

export default PrintColourlist