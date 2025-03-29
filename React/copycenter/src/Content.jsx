import React from "react";
import Service from "./Service";

const Content = ({Services}) => {
    return (
        <main>
            <div>
                {Services.map(service => <Service service={service} key={service.id}/>)}
            </div>
        </main>
    )
}

export default Content