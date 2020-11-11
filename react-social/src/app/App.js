import React, { useState, useEffect, Fragment } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser, getAdmin } from '../util/APIUtils';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import Main from '../main/Main';
import FreeGallery from '../fresh/FreeGallery';
import RegularGallery from '../regular/RegularGallery';
import GraduateGallery from '../graduate/GraduateGallery';
import GuestBook from '../guestbook/GuestBook';
import { BrowserRouter as Router } from 'react-router-dom';
import SubjectGallery from '../fresh/SubjectGallery';
import { Grid } from '@material-ui/core';
import GraduateContent from '../graduate/GraduateContent';
import Admin from '../admin/Admin';
import AdminRouter from '../admin/AdminRouter';
import AdminList from '../admin/AdminList';



function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCurrentlyLoggedInUser = async () => {
    setLoading(true)
    try {
      setCurrentUser(await getCurrentUser())
      setLoading(false)
      setAuthenticated(true)
      console.log('왜 안되는거냐')
    } catch (err) {
      try{
        await getAdmin()
        setLoading(false)
        setIsAdmin(true)
        setAuthenticated(true)
        console.log("넌 관리자냐?")
      }catch(err){
        setLoading(false)
        console.log(err && err.message)
      }
    }
  }
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false)
    setCurrentUser(null)
    Alert.success("로그아웃 되었습니다.")
  }

  useEffect(() => {
    loadCurrentlyLoggedInUser()
    console.log(authenticated + `관리자? ${isAdmin}`)

  }, [authenticated]
  )

  if (loading) {
    return <LoadingIndicator />
  } else{
    return (
      <Router>
        <div className="app">
            <Route render={({ location }) => {
              return (
            <div className="app-top-box" style={location.pathname === '/' ? {display:'none'} : {}}>
                <AppHeader authenticated={authenticated} path={location.pathname} onLogout={handleLogout} />
          </div>
              )
            }} />
          
            <Fragment>
            <Grid container className="app-body">
              <Grid container item xs={12} className="app-content">
                <Switch>
                  <Route exact path="/" component={Main}></Route>
                  <PrivateRoute path="/profile" authenticated={authenticated} currentUser={currentUser}
                    component={Profile}>
                  </PrivateRoute>
                  <Route path="/home" component={Home}></Route>
                  <Route path="/login"
                    render={(props) => <Login authenticated={authenticated} {...props} />}></Route> 
                    <Redirect path="/logout" to="/" />
                  <AdminRouter path="/admin" isAdmin = {isAdmin} component={Admin} />
                  <AdminRouter path="/list" isAdmin = {isAdmin} component={AdminList}/>
                  <Route path="/signup"
                    render={(props) => <Signup authenticated={authenticated} {...props} />}></Route>
                  <Route path="/fresh/free" component={FreeGallery}></Route>
                  <Route path="/fresh/subject" component={SubjectGallery}></Route>
                  <Route path="/regular" component={RegularGallery} />
                  <Route path="/graduate/:student" component={GraduateContent}></Route>
                  <Route path="/graduate" component={GraduateGallery} />
                  <Route path="/guestbook"
                    render={() => <GuestBook auth={authenticated} />} />
                  <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                  <Route component={NotFound}></Route>
                </Switch>
              </Grid>
            </Grid>
              </Fragment>
            
        </div>
      </Router>
    )
  }
}

export default App;
