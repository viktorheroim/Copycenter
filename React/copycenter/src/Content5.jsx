import React from "react";
import PrintBWlist from "./PrintBWlist";

const Content5 = ({PrintBW}) => {
    return (
        <main>
            <div>
                {PrintBW.map(printbw => <PrintBWlist printbw={printbw} key={printbw.id}/>)}
            </div>
        </main>
    )
}

export default Content5