import React, { useState, useEffect, useRef, Fragment } from 'react'
import Scaleup from './Sacleup';

function GalleryContent({data, onClick}){

    const scaleUp = useRef(document.createElement('div'))
        console.log(onClick)
        return (
        <Fragment>

            <div className="photo_contents" style={{display:"flex", flexWrap:'wrap', alignItems:"flex-start"}} ref={scaleUp}>
                {data.map((src, i) => {
                    return(
                        <img style={{width:"50%"}} src={src.filePath} key={i} alt="content" onClick={onClick}/>
                        )
                    })}
            </div>
        </Fragment>
    )
}

export default GalleryContent