import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './common/Header';
import ErrorPage from './common/ErrorPage';
import RouteProtected from './context/RouteProtected';
import { RouteConfig } from './RouteConfig';
import { ToastContainer } from 'react-toastify';
const App = () => {
    const [count, setCount] = useState(0);
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, null),
        React.createElement(Routes, null,
            RouteConfig.map(({ path, component: Component, protected: isProtected, role }, index) => (React.createElement(Route, { key: index, path: path, element: isProtected ? (React.createElement(RouteProtected, { role: role, path: path },
                    React.createElement(Component, null))) : (React.createElement(Component, null)) }))),
            React.createElement(Route, { path: "*", element: React.createElement(ErrorPage, null) })),
        React.createElement(ToastContainer, null)));
};
export default App;
