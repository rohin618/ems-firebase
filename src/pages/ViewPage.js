import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContest";
const EmployeeView = () => {
    const { Auth } = useAuthContext();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [randomWorkingDays, setRandomWorkingDays] = useState(null);
    useEffect(() => {
        const fetchEmployee = async () => {
            if (!Auth)
                return;
            try {
                const docRef = doc(db, "employee", Auth);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setEmployee({ id: docSnap.id, ...docSnap.data() });
                }
            }
            catch (error) {
                console.error("Error fetching employee:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [Auth]);
    useEffect(() => {
        // Generate random working days between 20 and 26
        setRandomWorkingDays(Math.floor(Math.random() * 7) + 20);
    }, []);
    if (loading) {
        return React.createElement("p", { className: "text-center mt-5" }, "Loading your profile...");
    }
    if (!employee) {
        return React.createElement("p", { className: "text-center text-danger mt-5" }, "No employee data found.");
    }
    return (React.createElement("div", { className: "w-100 min-vh-100 bg-white", style: {
            padding: "40px 0",
            fontFamily: "monospace",
            background: "#f8f9fa"
        } },
        React.createElement("div", { className: "mx-auto", style: {
                maxWidth: "800px",
                background: "#fff",
                border: "1px solid #dee2e6",
                padding: "40px",
                boxShadow: "0 0 32px rgba(0,0,0,0.08)"
            } },
            React.createElement("div", { className: "d-flex align-items-center mb-4" },
                React.createElement("div", { className: "rounded-circle bg-primary text-white d-flex justify-content-center align-items-center", style: { width: 80, height: 80, fontSize: 32, marginRight: 24 } }, employee.name.charAt(0).toUpperCase()),
                React.createElement("div", null,
                    React.createElement("h2", { className: "mb-1", style: { fontWeight: 700 } }, employee.name),
                    React.createElement("span", { className: "text-muted" },
                        "Employee ID: ",
                        employee.empId))),
            React.createElement("hr", null),
            React.createElement("div", { className: "row mb-4" },
                React.createElement("div", { className: "col-md-6 mb-2" },
                    React.createElement("strong", null, "Role:"),
                    " ",
                    employee.role),
                React.createElement("div", { className: "col-md-6 mb-2" },
                    React.createElement("strong", null, "Salary:"),
                    " \u20B9",
                    employee.salary.toLocaleString()),
                React.createElement("div", { className: "col-md-6 mb-2" },
                    React.createElement("strong", null, "Date of Birth:"),
                    " ",
                    employee.dob),
                React.createElement("div", { className: "col-md-6 mb-2" },
                    React.createElement("strong", null, "Mobile:"),
                    " ",
                    employee.mobile),
                React.createElement("div", { className: "col-md-6 mb-2" },
                    React.createElement("strong", null, "Leave Info:"),
                    " ",
                    employee.leaveInfo,
                    " days"),
                React.createElement("div", { className: "col-md-6 mb-2" },
                    React.createElement("strong", null, "Working Days:"),
                    " ",
                    randomWorkingDays ?? employee.workingDays)),
            React.createElement("div", { className: "text-end text-muted", style: { fontSize: 14 } },
                React.createElement("span", null,
                    "Generated on: ",
                    new Date().toLocaleDateString())))));
};
export default EmployeeView;
