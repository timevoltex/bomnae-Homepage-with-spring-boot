import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

function AdminUpdate({...props}){
    const [update, setUpdate] = useState([])

    const onChange = (e) => {
        const target = e.target
        const inputName = target.name
        const inputValue = target.value
        setUpdate({...update, [inputName]: inputValue,})
        console.log(update)
        console.log(inputName)
        console.log(inputValue)
    }

    const onSetImage = (e) => {
        setUpdate({...update, file:e.target.files[0]})
        const reader = new FileReader();
        reader.onload = (event) => {
            console.log(event.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const onLoadImage = (img) => {
        const url = new URL(img)

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
        }
        reader.readAsDataURL(url);
    }
    const onSubmit = async() => {
        const formData = new FormData()
        formData.append('title', update.title)
        formData.append('content', update.content)
        formData.append('artist', update.artist)
        formData.append('generation', update.generation)
        formData.append('format', update.format)
        for(let a of formData.entries()){
            console.log(a[0] + a[1])
        }
        await axios.put(API_BASE_URL + `/api/v1/artwork/${props.location.state.item}`, formData, {
            headers: {Authorization : localStorage.getItem(ACCESS_TOKEN), 'Content-type':'multipart/form-data'}
        }).then(response => {
            console.log(response && response.message)
            props.history.push('/admin/list')
        }).catch(error => {
            console.log(error && error.message)
        })
    }
    
    const test = async() => {
        try{
            const response = await axios.get(API_BASE_URL + `/api/v1/artwork/${props.location.state.item}`,{
                headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
            })
            const data = response.data
            setUpdate(data)
            console.log(data)
            const url = new URL(data.filepath)
            const file = await fetch(url, {headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}}).then(r => r.blob()).then(blobFile => new File([blobFile], 'current', {type : "image/*"}))
            console.log(file)
            
        } catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        test();
        // onLoadImage(update.filepath)
        // console.log(update)
    }, [])
    return(
        <div>
            <img src={update.filepath || ''} style={{width:'50vmin'}}/>
            {/* <form onSubmit={onSubmit}> */}
                <p>
                <input type="text" value={update.artist || ''} className="artist"  name="artist" onChange={onChange}/>
                </p>
                <p>
                <input type="text" value={update.title || ''} className="title" name="title" onChange={onChange}/>
                </p>
                <p>
                <input type="text" value={update.content || ''} className="content"  name="content" onChange={onChange}/>
                </p>
                <p>
                <input type="number" value={update.generation || ''} className="generation"  name="generation" onChange={onChange}/>
                </p>
                <p>
                <input type="text" value={update.format || ''} className="format"  name="format"onChange={onChange}/>
                </p>
                <p>
                <input type="file" accept="image/*" name="file" onChange={onSetImage} className="image"/>
                </p>
                <button onClick={onSubmit}>완료</button>
            {/* </form> */}
        </div>
    )
}

export default AdminUpdate