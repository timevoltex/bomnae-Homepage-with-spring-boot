import React, { useState, Fragment } from 'react'
import axios from 'axios'
import {Input, Button} from '@material-ui/core'
import { API_BASE_URL, ACCESS_TOKEN, DEVELOPMENT_URL } from '../constants'

function Admin(){
    const [thumbnail, setThumbnail] = useState("")
    const [info, setInfo] = useState({
        title: '',
        content: '',
        file: null,
        artist: '',
        generation: '',
        format: ''
    })
    const onSetImage = (e) => {
        setInfo({...info, file:e.target.files[0]})
        const reader = new FileReader();
        reader.onload = (event) => {
            console.log(event.target.result)
            setThumbnail(event.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }
        
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
        formData.append('title', info.title)
        formData.append('content', info.content)
        formData.append('file', info.file)
        formData.append('artist', info.artist)
        formData.append('generation', info.generation)
        formData.append('format', info.format)
        for(let a of formData.entries()){
            console.log(a[0] + a[1])
        }
        await axios.post(DEVELOPMENT_URL + '/api/v1/artwork/', formData, {
            headers: {Authorization : localStorage.getItem(ACCESS_TOKEN), 'Content-type':'multipart/form-data'}
        }).then(response => {
            console.log(response && response.message)
        }).catch(error => {
            console.log(error && error.message)
        })
    }

    return(
        <div style={{width:'50vmax', margin:'auto'}}>

        <div style={{display:'flex', flexDirection:'column', padding:8, margin: 'auto', border:'1px solid gray'}}>
            <Input required type="text" value={info.title} onChange={onChange} name="title" placeholder="제목을 입력해주세요"/>
            <Input required type="text" value={info.content} onChange={onChange} name="content" placeholder="내용을 입력해주세요"/>
            <Input required type="text" value={info.artist} onChange={onChange} name="artist" placeholder="이름을 입력해주세요"/>
            <Input required type="text" value={info.generation} onChange={onChange} name="generation" placeholder="기수를 입력해주세요(숫자만)"/>
            <Input required type="text" value={info.format} onChange={onChange} name="format" placeholder="정기전 OR 신인전"/>
            <input required accept="image/*" id="contained-button-file"  type="file"  onChange={onSetImage} style={{display:'none'}}/>
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="secondary" component="span">업로드</Button>
            </label>
            <button onClick = {onSubmit}>제출</button>
        </div>
        <img src={thumbnail} style={{width:'50vmax'}}/>
        </div>
    )
}

export default Admin