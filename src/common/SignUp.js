import React, { useState } from "react";
import { db } from "../firebase-config"; // Firestore instance
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const HRSignUp = () => {
    const [user, setUser] = useState({
        name: "",
        password: "",
        role: "HR", // fixed role for this signup
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const usersCollection = collection(db, "users");
            await addDoc(usersCollection, user); // store only name, password, role
            toast.success("HR registered successfully!");
            setUser({ name: "", password: "", role: "HR" }); // reset form
            navigate('/login');
        }
        catch (error) {
            console.error("Error adding user:", error);
            toast.error("Failed to register HR.");
        }
    };
    return (React.createElement("div", { className: "login-container" },
        React.createElement("h2", { className: "text-center m-2" }, "HR Registration"),
        React.createElement("form", { className: "login-content", onSubmit: handleSubmit },
            React.createElement("div", { className: "mb-3" },
                React.createElement("label", { htmlFor: "name", className: "form-label" }, "Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "name", name: "name", value: user.name, onChange: handleChange, required: true })),
            React.createElement("div", { className: "mb-3" },
                React.createElement("label", { htmlFor: "password", className: "form-label" }, "Password"),
                React.createElement("input", { type: "password", className: "form-control", id: "password", name: "password", value: user.password, onChange: handleChange, required: true })),
            React.createElement("button", { type: "submit", className: "btn btn-primary" }, "Register HR"))));
};
export default HRSignUp;
