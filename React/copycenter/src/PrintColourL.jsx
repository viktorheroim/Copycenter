import React from "react";

const PrintColourL = (props) => {
    return (
        <div className='printcolour'>
            <div>{props.printcol.id}. Формат: {props.printcol.format}</div>
            <div>Цена: {props.printcol.price} руб.</div>
        </div>
    )
}

export default PrintColourL