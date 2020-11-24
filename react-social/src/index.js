import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
// import Router from "react-router";
// import ReactGA from "react-ga";

// ReactGA.initialize("UA-183822982-1");

// function logPageView() {
//   ReactGA.pageview(window.location.pathname);
//   ReactGA.set({ page: window.location.pathname });
// }

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
