import React, { useState, useEffect } from 'react'
import GalleryContent from '../common/GalleryContent'
import SideMenu from '../common/SideMenu'
import axios from 'axios';
import { Grid } from '@material-ui/core'
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

function GraduateContent({ match }) {
    const [images, setImages] = useState([])
    const getImage = async() => {
        try{
            const response = await axios.get(API_BASE_URL, '/api/v1/artwork/format', {
                header: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
            })
            const data = response.data;
            setImages(data)
        }catch(err){
            console.log(err);
            alert("정보를 불러올 수 없습니다.")
        }
    }

    useEffect(() => {
        getImage();
    }, [])
    return (
        <Grid container>
            <Grid item xs={2}>
                <SideMenu name={match.params.student} />
            </Grid>
            <Grid item xs={12} sm>
                <GalleryContent data={images || null}/>
            </Grid>
        </Grid>
    )
}

export default GraduateContent