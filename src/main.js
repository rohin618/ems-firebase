import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContest";
createRoot(document.getElementById("root")).render(React.createElement(StrictMode, null,
    React.createElement(HashRouter, null,
        React.createElement(AuthProvider, null,
            React.createElement(App, null)))));
