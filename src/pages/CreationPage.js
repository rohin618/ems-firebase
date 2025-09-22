import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc, } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const CreationPage = () => {
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    // Fetch employees from Firestore
    useEffect(() => {
        const fetchEmployees = async () => {
            const snapshot = await getDocs(collection(db, "employee"));
            const empData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEmployees(empData);
        };
        fetchEmployees();
    }, []);
    // Delete employee
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "employee", id));
        setEmployees(employees.filter((emp) => emp.id !== id));
    };
    // Navigate to edit page
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };
    // Navigate to create page
    const handleCreate = () => {
        navigate("/create");
    };
    return (React.createElement("div", { className: "container mt-4" },
        React.createElement("div", { className: "d-flex justify-content-between align-items-center mb-3" },
            React.createElement("input", { type: "text", className: "form-control w-50", placeholder: "Search employee...", value: search, onChange: (e) => setSearch(e.target.value) }),
            React.createElement("button", { className: "btn btn-primary ms-3", onClick: handleCreate }, "Create Employee")),
        React.createElement("table", { className: "table table-bordered table-hover" },
            React.createElement("thead", { className: "table-dark" },
                React.createElement("tr", null,
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Emp ID"),
                    React.createElement("th", null, "Password"),
                    React.createElement("th", null, "Role"),
                    React.createElement("th", null, "Salary"),
                    React.createElement("th", null, "DOB"),
                    React.createElement("th", null, "Mobile"),
                    React.createElement("th", null, "Actions"))),
            React.createElement("tbody", null, employees
                .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()))
                .map((emp) => (React.createElement("tr", { key: emp.id },
                React.createElement("td", null, emp.name),
                React.createElement("td", null, emp.empId),
                React.createElement("td", null, emp.password),
                React.createElement("td", null, emp.role),
                React.createElement("td", null,
                    "\u20B9",
                    emp.salary.toLocaleString()),
                React.createElement("td", null, emp.dob),
                React.createElement("td", null, emp.mobile),
                React.createElement("td", null,
                    React.createElement("button", { className: "btn btn-sm btn-warning me-2", onClick: () => handleEdit(emp.id) }, "Edit"),
                    React.createElement("button", { className: "btn btn-sm btn-danger", onClick: () => handleDelete(emp.id) }, "Delete")))))))));
};
export default CreationPage;
