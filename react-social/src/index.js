import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import { Router, BrowserRouter } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import ReactGA from "react-ga";

const history = createHistory();
ReactGA.initialize("UA-183822982-1");
history.listen((location, action) => {
  ReactGA.pageview(window.location.pathname + window.location.search);
});

ReactDOM.render(
  <Router history={history}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
