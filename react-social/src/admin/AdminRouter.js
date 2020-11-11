import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
import { ADMIN_TOKEN } from '../constants';
  

const AdminRouter = ({ component: Component, isAdmin, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(ADMIN_TOKEN) ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
);
  
export default AdminRouter