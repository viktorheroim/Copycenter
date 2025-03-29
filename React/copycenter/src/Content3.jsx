import React from "react";
import Laminatlist from "./Laminatlist";

const Content3 = ({Laminating}) => {
    return (
        <main>
            <div>
                {Laminating.map(laminat => <Laminatlist laminat={laminat} key={laminat.id}/>)}
            </div>
        </main>
    )
}

export default Content3