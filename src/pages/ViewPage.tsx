import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContest";

interface Employee {
  id: string;
  name: string;
  empId: string;
  role: string;
  salary: number;
  dob: string;
  mobile: string;
  leaveInfo: number;
  workingDays: number;
}

const EmployeeView: React.FC = () => {
  const { Auth } = useAuthContext();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [randomWorkingDays, setRandomWorkingDays] = useState<number | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!Auth) return;
      try {
        const docRef = doc(db, "employee", Auth);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEmployee({ id: docSnap.id, ...(docSnap.data() as Omit<Employee, "id">) });
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
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
    return <p className="text-center mt-5">Loading your profile...</p>;
  }

  if (!employee) {
    return <p className="text-center text-danger mt-5">No employee data found.</p>;
  }

  return (
    <div
      className="w-100 min-vh-100 bg-white"
      style={{
        padding: "40px 0",
        fontFamily: "monospace",
        background: "#f8f9fa"
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "800px",
          background: "#fff",
          border: "1px solid #dee2e6",
          padding: "40px",
          boxShadow: "0 0 32px rgba(0,0,0,0.08)"
        }}
      >
        <div className="d-flex align-items-center mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
            style={{ width: 80, height: 80, fontSize: 32, marginRight: 24 }}
          >
            {employee.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="mb-1" style={{ fontWeight: 700 }}>{employee.name}</h2>
            <span className="text-muted">Employee ID: {employee.empId}</span>
          </div>
        </div>

        <hr />

        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <strong>Role:</strong> {employee.role}
          </div>
          <div className="col-md-6 mb-2">
            <strong>Salary:</strong> ₹{employee.salary.toLocaleString()}
          </div>
          <div className="col-md-6 mb-2">
            <strong>Date of Birth:</strong> {employee.dob}
          </div>
          <div className="col-md-6 mb-2">
            <strong>Mobile:</strong> {employee.mobile}
          </div>
          <div className="col-md-6 mb-2">
            <strong>Leave Info:</strong> {employee.leaveInfo} days
          </div>
          <div className="col-md-6 mb-2">
            <strong>Working Days:</strong> {randomWorkingDays ?? employee.workingDays}
          </div>
        </div>

        <div className="text-end text-muted" style={{ fontSize: 14 }}>
          <span>Generated on: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
