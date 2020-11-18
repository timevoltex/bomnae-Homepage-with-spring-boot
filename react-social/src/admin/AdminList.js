import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN, DEVELOPMENT_URL } from '../constants'
import food from '../img/fb-logo.png'
import { Link } from 'react-router-dom'

function AdminList(){
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        let mounted = true
    const getArtList = async() => {
        try{
            const response = await axios.get(API_BASE_URL + '/api/v1/artwork/format', {
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

        return () => (mounted = false)
    },[])
    if(!loading) return <div>로딩중....</div>
    else{    
        return(
            <div>
                {list.map((item, i) => {
                    console.log(item.id)
                    return(
                    <div key={item.id}>
                        <img src={item.filePath} style={{width:'50vmin'}}/>
                        <form>
                            <p>
                            <input readOnly className="title" value={item.title}/>
                            </p>
                            <p>
                            <button type="submit">삭제</button>
                            </p>
                        </form>
                            <Link to={{pathname: "/admin/update", state: {item: item.id}}}>수정</Link>
                    </div>
                        )
                })}
            </div>
        )
    }
}
    
export default AdminList