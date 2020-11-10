import React from 'react'
import GalleryContent from '../common/GalleryContent'
import { Grid } from '@material-ui/core'
import SideMenu from '../common/SideMenu'

function FreeGallery() {
    return (
        <Grid container>
            <Grid item xs={2}>
                <SideMenu />
            </Grid>
            <Grid item xd={12} sm container>

                <GalleryContent />
            </Grid>
        </Grid>
    )
}

export default FreeGallery