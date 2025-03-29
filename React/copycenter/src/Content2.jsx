import React from "react";
import Photo from "./Photo";

const Content2 = ({PrintPhoto}) => {
    return (
        <main>
            {/*<img src={process.env.PUBLIC_URL + '/Фото.jpg'} alt="Изображение"/>*/}
            <div>
                {PrintPhoto.map(photo => <Photo photo={photo} key={photo.id}/>)}
            </div>
        </main>
    )
}

export default Content2