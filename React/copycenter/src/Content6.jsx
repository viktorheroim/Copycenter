import React from "react";
import PrintColourlist from "./PrintColourlist";

const Content6 = ({PrintColour}) => {
    return (
        <main>
            <div>
                {PrintColour.map(printcolour => <PrintColourlist printcolour={printcolour} key={printcolour.id}/>)}
            </div>
        </main>
    )
}

export default Content6