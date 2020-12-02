import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import { Router, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Router>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
