import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN, DEVELOPMENT_URL } from '../constants'
import food from '../img/fb-logo.png'

function AdminList(){
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
    const getArtList = async() => {
        try{
            const response = await axios.get(DEVELOPMENT_URL + '/api/v1/artwork/format', {
                headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
            })
            setLoading(true)
            const data = response.data
            setList(data)
            console.log(data)
        }catch(e){
            console.log(e.message)
        }
    }
        getArtList()
        console.log(list)
        console.log(loading)
    },[])
    if(!loading) return <div>로딩중....</div>
    else{    
        return(
            <div>
                {list.map((item, i) => {
                    console.log(item)
                    return(
                    <img src={item.filePath} style={{width:'50vmin'}}/>
                        )
                })}
            </div>
        )
    }
}
    
export default AdminList