import React from "react";

const Bind = (props) => {
    return (
        <div className='bind'>
            <div>{props.bind.id}. {props.bind.description}</div>
            <div>Цена: {props.bind.price} руб.</div>
        </div>
    )
}

export default Bind