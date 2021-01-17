import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import LCS from "./Pages/LCS";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <switch>
        <Route exact path="/" component={() => <App />} />
        <Route exact path="/LCS" component={() => <LCS />} />
        <Route exact path="/SCS" component={() => <LCS />} />
        <Route exact path="/LIS" component={() => <LCS />} />
        <Route exact path="/ED" component={() => <LCS />} />
        <Route exact path="/MCM" component={() => <LCS />} />
        <Route exact path="/KP" component={() => <LCS />} />
        <Route exact path="/PP" component={() => <LCS />} />
        <Route exact path="/RC" component={() => <LCS />} />
        <Route exact path="/CCP" component={() => <LCS />} />
        <Route exact path="/WBP" component={() => <LCS />} />
      </switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
