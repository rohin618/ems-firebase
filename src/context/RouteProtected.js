import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContest';
const RouteProtected = ({ children, role, path }) => {
    const { Auth, Role } = useAuthContext();
    console.log(Auth, Role);
    // Not logged in → redirect
    if (!Auth) {
        return React.createElement(Navigate, { to: "/login", replace: true });
    }
    if (path === "/ems-firebase") {
        if (Role === "HR") {
            return React.createElement(Navigate, { to: "/hrinfo", replace: true });
        }
        else {
            return React.createElement(Navigate, { to: "/emsinfo", replace: true });
        }
    }
    // Admin can access both Admin and User routes
    if (Role === 'HR' && role === 'HR') {
        return React.createElement(React.Fragment, null, children);
    }
    // User can only access User routes
    if (Role === 'EMP' && role === 'EMP') {
        return React.createElement(React.Fragment, null, children);
    }
    // Unauthorized → go back or send to "403 Forbidden" page
    return React.createElement(Navigate, { to: "/ErrorPage", replace: true });
};
export default RouteProtected;
