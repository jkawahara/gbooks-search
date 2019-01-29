// *** Include Modules: npm (react, react-dom), ./App, /index.css
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Render components in #root element of index.html 
ReactDOM.render(<App />, document.getElementById("root"));
