import React, { useState, useEffect } from 'react'
import GalleryContent from '../common/GalleryContent'
import { Grid } from '@material-ui/core'
import SideMenu from '../common/SideMenu'
import axios from 'axios';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';

function RegularGallery({scaleup}) {
    const [item, setItem] = useState([])
    const getImage = async() => {
        try{
            const response = await axios.get(API_BASE_URL + '/api/v1/artwork/format', {
                headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
            });
            const data = response.data;
            setItem(data)
        }catch(err){
            console.log(err);
        }
    }
    console.log(scaleup)
    useEffect(() => {
        getImage();
    }, [])
    return (
        <Grid container>
        <Grid item xs={2}>
            <SideMenu isRegular={true} />
        </Grid>
        <Grid item xd={12} sm container>
            <GalleryContent data={item} onClick={scaleup}/>
        </Grid>
    </Grid>
    )

}

export default RegularGallery