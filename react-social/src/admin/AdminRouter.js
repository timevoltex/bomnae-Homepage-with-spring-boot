import React, { Fragment } from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
import { ADMIN_TOKEN } from '../constants';
import Admin from './Admin';
import AdminList from './AdminList';
import AdminUpdate from './AdminUpdate';
  

const AdminRouter = ({ ...props}) => {
  if(localStorage.getItem(ADMIN_TOKEN) === 'true'){
    return(
      <Fragment>
        <Route exact path="/admin" component={Admin}/>
        <Route path="/admin/list" component={AdminList}/>
        <Route path="/admin/update" component={AdminUpdate}/>
      </Fragment>
    )
  }else{
    return <Redirect to={{pathname: "/", state: {from: props.location}}}/>
  }
};
  
export default AdminRouter