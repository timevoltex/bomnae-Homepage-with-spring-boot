import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
// import { useHistory, useLocation } from "react-router";
import AppHeader from "../common/AppHeader";
import Home from "../home/Home";
import Login from "../user/login/Login";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import NotFound from "../common/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import { getCurrentUser, getAdmin } from "../util/APIUtils";
import { ACCESS_TOKEN, ADMIN_TOKEN } from "../constants";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";
import Main from "../main/Main";
import Gallery from "../gallery/Gallery";
import GuestBook from "../guestbook/GuestBook";
import { Grid } from "@material-ui/core";
import GraduateContent from "../graduate/GraduateContent";
import AdminRouter from "../admin/AdminRouter";
import ReactGA from "react-ga";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "../theme";
import font from "../font/flower_road.otf";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCurrentlyLoggedInUser = async () => {
    setLoading(true);
    try {
      setCurrentUser(await getCurrentUser());
      setLoading(false);
      setAuthenticated(true);
    } catch (err) {
      try {
        await getAdmin();
        setLoading(false);
        setIsAdmin(true);
        setAuthenticated(true);
      } catch (err) {
        setLoading(false);
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    Alert.success("로그아웃 되었습니다.");
  };
  const adminLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ADMIN_TOKEN, false);
    setAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser(null);
    Alert.success("로그아웃 되었습니다.");
  };

  //Chrome에 최적화되었으므로 Chrome인지 검사
  const isChrome = navigator.userAgent.toLocaleLowerCase();

  //사용자 추적을 위한 GA
  const query = useHistory();
  const pLoaction = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(pLoaction.search);
    if (queryParams.has("token")) {
      queryParams.delete("token");
      query.replace({
        search: queryParams.toString(),
      });
    }
  }, []);

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, [authenticated]);

  useEffect(() => {
    ReactGA.initialize("UA-183822982-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  useEffect(() => {
    if (isChrome.indexOf("chrome") === -1) {
      alert("크롬에 최적화 되어있습니다. 크롬브라우저를 이용해주세요!");
    }
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="app">
          <Route
            render={({ location }) => {
              return (
                <div
                  className="app-top-box"
                  style={location.pathname === "/" ? { display: "none" } : {}}
                >
                  <AppHeader
                    authenticated={authenticated}
                    path={location.pathname}
                    onLogout={handleLogout}
                    onAdminLogout={adminLogout}
                    currentUser={currentUser}
                  />
                </div>
              );
            }}
          />
          <Grid container className="app-body">
            <Grid container item xs={12} className="app-content">
              <Switch>
                <Route exact path="/" component={Main}></Route>
                <Route path="/home" component={Home}></Route>-{" "}
                <Route
                  path="/login"
                  render={(props) => (
                    <Login authenticated={authenticated} {...props} />
                  )}
                ></Route>
                <Redirect path="/logout" to="/" />
                <Route
                  path="/admin"
                  render={({ location }) => (
                    <AdminRouter isAdmin={isAdmin} location={location} />
                  )}
                />
                <Route path="/gallery" render={() => <Gallery />} />
                <Route
                  path="/graduate/:student"
                  component={GraduateContent}
                ></Route>
                <Route
                  path="/guestbook"
                  render={() => <GuestBook auth={authenticated} />}
                />
                <Route
                  path="/oauth2/redirect"
                  component={OAuth2RedirectHandler}
                ></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

const GlobalStyle = createGlobalStyle`
  @font-face{
    font-family: 'Flower road';
    src: url(${font}) ;
    font-weight: 400;
    font-style: normal;
    font-display: auto;
  }

  div, span, p, h1, h2, h3, h4, h5{
    font-family: "Flower road"!important;
  }
`;
