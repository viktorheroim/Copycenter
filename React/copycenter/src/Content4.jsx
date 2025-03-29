import React from "react";
import Bind from "./Bind";

const Content4 = ({Binding}) => {
    return (
        <main>
            <div>
                {Binding.map(bind => <Bind bind={bind} key={bind.id}/>)}
            </div>
        </main>
    )
}

export default Content4