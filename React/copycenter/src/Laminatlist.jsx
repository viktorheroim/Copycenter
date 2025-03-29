import React from "react";

const Laminatlist = (props) => {
    return (
        <div className='laminat'>
            <div>{props.laminat.id}. Формат: {props.laminat.format}</div>
            <div>Цена: {props.laminat.price} руб.</div>
        </div>
    )
}

export default Laminatlist