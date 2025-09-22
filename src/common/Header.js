import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContest";
const Header = () => {
    const name = "EMS";
    const { Auth, Role, userName, logout } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (Auth && Role) {
            navigate(Role === 'HR' ? '/hrinfo' : '/emsinfo');
        }
        else {
            navigate('/login');
        }
    }, [Auth, Role, navigate]);
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (React.createElement("nav", { className: "navbar navbar-expand-lg bg-light border-bottom shadow-sm" },
        React.createElement("div", { className: "container-fluid" },
            React.createElement("a", { className: "navbar-brand fw-bold text-primary", href: "#" }, name),
            React.createElement("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarNav", "aria-controls": "navbarNav", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                React.createElement("span", { className: "navbar-toggler-icon" })),
            React.createElement("div", { className: "collapse navbar-collapse", id: "navbarNav" },
                React.createElement("ul", { className: "navbar-nav me-auto mb-2 mb-lg-0" }),
                React.createElement("div", { className: "nav-item" },
                    React.createElement("div", { className: "d-flex align-items-center gap-3" }, !Auth ? (React.createElement(React.Fragment, null,
                        React.createElement(Link, { className: "btn btn-outline-primary", to: "/login" }, "Login"),
                        React.createElement(Link, { className: "btn btn-primary", to: "/register" }, "Register"))) : (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "fw-semibold text-primary" },
                            "Howdy, ",
                            userName),
                        React.createElement("button", { className: "btn btn-outline-danger", onClick: handleLogout }, "Logout")))))))));
};
export default Header;
