import React from "react";

const Information = (props) => {
    return (
        <div className='information'>
            <div>{props.information.info}</div>
        </div>
    )
}

export default Information