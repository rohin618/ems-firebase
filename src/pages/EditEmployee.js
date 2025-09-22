import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const EditEmployee = () => {
    const { id } = useParams();
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEmployee = async () => {
            if (id) {
                const docRef = doc(db, "employee", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setForm(docSnap.data());
                }
            }
        };
        fetchEmployee();
    }, [id]);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            try {
                await updateDoc(doc(db, "employee", id), form);
                toast.success("✅ Employee updated successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                });
                setTimeout(() => navigate("/hrinfo"), 2000);
            }
            catch (error) {
                toast.error("❌ Failed to update employee");
            }
        }
    };
    return (React.createElement("div", { className: "container mt-4" },
        React.createElement("h3", null, "Edit Employee"),
        React.createElement("form", { onSubmit: handleSubmit },
            Object.keys(form).map((key) => (React.createElement("div", { className: "mb-3", key: key },
                React.createElement("label", { className: "form-label" }, key),
                React.createElement("input", { type: "text", name: key, value: form[key], onChange: handleChange, className: "form-control", required: true })))),
            React.createElement("button", { className: "btn btn-primary", type: "submit" }, "Update"))));
};
export default EditEmployee;
