import React, { useState } from 'react'

function GalleryContent(){
    const [photo, setPhoto] = useState([
        {src:"http://www.10000img.com/rimg2/bif44.jpg", name:"title"},
        {src:"http://www.10000img.com/rimg2/oxe02.jpg", name:"title"},
        {src:"http://www.10000img.com/rimg2/nyf23.jpg", name:"title"},
        {src:"http://www.10000img.com/rimg3/vvy47.jpg", name:"title"},
        {src:"http://www.10000img.com/rimg3/loe12.jpg", name:"title"},
        {src:"http://www.10000img.com/rimg3/boa53.jpg", name:"title"},
        {src:"http://www.10000img.com/rimg4/hmj28.jpg", name:"title"},
        {src:"http://www.10000img.com/rimg4/cab02.jpg", name:"title"}
    ])
    const random = () => {
        photo.sort(()=> {
            return Math.random() - Math.random()
        })
    }
        return (
            <div style={{display:"flex", flexWrap:'wrap', alignItems:"flex-start"}}>
                {random()}
                {photo.map((src, i) => {
                    return(
                        <img style={{width:"50%"}} src={src.src} key={i} alt="content"/>
                        )
                })}
            </div>
    )
}

export default GalleryContent