import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContest";
const Login = () => {
    const [activeTab, setActiveTab] = useState("HR");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            let collectionName = activeTab === "HR" ? "users" : "employee";
            const q = query(collection(db, collectionName), where("name", "==", name));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setError("User not found!");
                return;
            }
            let userData;
            querySnapshot.forEach((doc) => {
                userData = { id: doc.id, ...doc.data() };
            });
            // ✅ check password
            if (userData.password !== password) {
                setError("Incorrect password");
                return;
            }
            // ✅ for EMP we don’t check role in doc, only for HR
            if (activeTab === "HR" && userData.role !== "HR") {
                setError("Invalid role for this account");
                return;
            }
            // ✅ Save in AuthContext
            login(userData.id, activeTab, userData.name);
            toast.success(`Logged in as ${activeTab}`);
            if (activeTab === "HR") {
                navigate("/hrinfo");
            }
            else {
                navigate("/emsinfo");
            }
        }
        catch (err) {
            setError(err.message);
        }
    };
    return (React.createElement("div", { className: "container mt-5", style: { maxWidth: "500px" } },
        React.createElement("ul", { className: "nav nav-tabs mb-3" },
            React.createElement("li", { className: "nav-item" },
                React.createElement("button", { className: `nav-link ${activeTab === "HR" ? "active" : ""}`, onClick: () => setActiveTab("HR") }, "HR")),
            React.createElement("li", { className: "nav-item" },
                React.createElement("button", { className: `nav-link ${activeTab === "EMP" ? "active" : ""}`, onClick: () => setActiveTab("EMP") }, "Employee"))),
        React.createElement("div", { className: "card shadow p-4" },
            React.createElement("h3", { className: "text-center mb-3" },
                activeTab,
                " Login"),
            error && React.createElement("div", { className: "alert alert-danger" }, error),
            React.createElement("form", { onSubmit: handleLogin },
                React.createElement("div", { className: "mb-3" },
                    React.createElement("label", { htmlFor: "name", className: "form-label" }, "Name"),
                    React.createElement("input", { type: "text", id: "name", className: "form-control", value: name, onChange: (e) => setName(e.target.value), placeholder: "Enter your name", required: true })),
                React.createElement("div", { className: "mb-3" },
                    React.createElement("label", { htmlFor: "password", className: "form-label" }, "Password"),
                    React.createElement("input", { type: "password", id: "password", className: "form-control", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", required: true })),
                React.createElement("button", { type: "submit", className: "btn btn-primary w-100" }, "Login")))));
};
export default Login;
