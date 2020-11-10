import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN } from '../constants'

function Admin(){
    const [image, setImage] = useState(null)

    const [info, setInfo] = useState({
        title: '',
        content: '',
        file: null,
        artist: '',
        generation: '',
        format: ''
    })
    const onSetImage = (e) => {
        setImage(e.target.files)
    }

    console.log(info)
    console.log(typeof(localStorage.getItem(ACCESS_TOKEN)))
    const onChange = (e) => {
        const target = e.target
        const inputName = target.name
        const inputValue = target.value

        setInfo({...info, [inputName]: inputValue,})
        console.log(info)
        console.log(inputName)
        console.log(inputValue)
    }

    const onSubmit = async() => {
        const formData = new FormData()
        formData.append('file', image.file)
        setInfo({...info, file: formData,})
        await axios.post(API_BASE_URL + '/api/v1/artwork/', info, {
            headers: {Authorization : localStorage.getItem(ACCESS_TOKEN)}
        }).then(response => {
            console.log(response && response.message)
        }).catch(error => {
            console.log(error && error.message)
        })
        console.log(info)
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <input type="text" value={info.title} onChange={onChange} name="title"/>
            <input type="text" value={info.content} onChange={onChange} name="content"/>
            <input type="text" value={info.artist} onChange={onChange} name="artist"/>
            <input type="text" value={info.generation} onChange={onChange} name="generation"/>
            <input type="text" value={info.format} onChange={onChange} name="format"/>
            <input type="file"  onChange={onSetImage}/>
            <button onSubmit={onSubmit}>제출</button>
        </div >
    )
}

export default Admin