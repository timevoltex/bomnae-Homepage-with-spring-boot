import React, { Fragment } from 'react'
import GalleryContent from '../common/GalleryContent'
import SideMenu from '../common/SideMenu'
import { Grid } from '@material-ui/core'

function GraduateContent({ match }) {
    return (
        <Grid container>
            <Grid item xs={2}>
                <SideMenu name={match.params.student} />
            </Grid>
            <Grid item xs={12} sm>
                <GalleryContent />
            </Grid>
        </Grid>
    )
}

export default GraduateContent