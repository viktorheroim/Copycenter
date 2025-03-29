import React from "react";

const PrintBWlist = (props) => {
    return (
        <div className='printbw'>
            <div>{props.printbw.id}. Формат: {props.printbw.format}</div>
            <div>Цена: {props.printbw.price} руб.</div>
        </div>
    )
}

export default PrintBWlist