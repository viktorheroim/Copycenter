import React from "react";

const Service = (props) => {
    return (
        <div className='service'>
            <div>{props.service.id}. {props.service.name_service}</div>
        </div>
    )
}

export default Service