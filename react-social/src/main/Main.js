import React, { Fragment } from 'react'
import Poster from '../img/poster.png'
import { NavLink } from 'react-router-dom'
import AppHeader from '../common/AppHeader'

function Main() {
    return (
        <Fragment>
            <div style={{width:"100vw", display:'flex', justifyContent:'center', backgroundColor:'#313131'}}>
                <img src={Poster} style={{ width: "50vw", height: "100vmax", margin:'0px auto' }} alt="MainPage"/>
        <NavLink to="/home" style={{position:'absolute', transform:'translate(0, 64vmax)', width:'15vmax', height:'36vmin'}}>
                <div className="enter" style={{width:'15vmax', height:'36vmin'}}></div>
        </NavLink>
            </div>
        </Fragment>
    )

}
export default Main