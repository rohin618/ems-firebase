import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [Auth, setAuth] = useState(localStorage.getItem("Auth_token"));
    const [Role, setRole] = useState(localStorage.getItem("role"));
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("Auth_token");
        const role = localStorage.getItem("role");
        if (token)
            setAuth(token);
        if (role)
            setRole(role);
    }, []);
    const login = (token, role, name) => {
        setAuth(token);
        setRole(role);
        setUserName(name);
        localStorage.setItem("Auth_token", token);
        localStorage.setItem("role", role);
    };
    const logout = () => {
        setAuth(null);
        setRole(null);
        localStorage.removeItem("Auth_token");
        localStorage.removeItem("role");
    };
    return (React.createElement(AuthContext.Provider, { value: { Auth, Role, login, logout, userName, setUserName } }, children));
};
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
