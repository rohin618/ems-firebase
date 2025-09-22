import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateEmployee = () => {
    const [form, setForm] = useState({
        name: "",
        empId: 0,
        password: "",
        role: "",
        salary: 0,
        dob: "",
        mobile: 0,
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "employee"), form);
            toast.success("✅ Employee created successfully!", {
                position: "top-right",
                autoClose: 2000,
            });
            setTimeout(() => navigate("/hrinfo"), 2000); // redirect after toast
        }
        catch (error) {
            toast.error("❌ Failed to create employee");
        }
    };
    return (React.createElement("div", { className: "container mt-4" },
        React.createElement("h3", null, "Create Employee"),
        React.createElement("form", { onSubmit: handleSubmit },
            Object.keys(form).map((key) => (React.createElement("div", { className: "mb-3", key: key },
                React.createElement("label", { className: "form-label" }, key),
                React.createElement("input", { type: "text", name: key, value: form[key], onChange: handleChange, className: "form-control", required: true })))),
            React.createElement("button", { className: "btn btn-success", type: "submit" }, "Save"))));
};
export default CreateEmployee;
