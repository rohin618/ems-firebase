import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: string; // Firestore doc id
  name: string;
  empId: number;
  password: string;
  role: string;
  salary: number;
  dob: string;
  mobile: number;
}

const CreationPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  // Fetch employees from Firestore
  useEffect(() => {
    const fetchEmployees = async () => {
      const snapshot = await getDocs(collection(db, "employee"));
      const empData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];
      setEmployees(empData);
    };
    fetchEmployees();
  }, []);

  // Delete employee
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "employee", id));
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // Navigate to edit page
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  // Navigate to create page
  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary ms-3" onClick={handleCreate}>
          Create Employee
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Emp ID</th>
            <th>Password</th>
            <th>Role</th>
            <th>Salary</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((emp) =>
              emp.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.empId}</td>
                <td>{emp.password}</td>
                <td>{emp.role}</td>
                <td>₹{emp.salary.toLocaleString()}</td>
                <td>{emp.dob}</td>
                <td>{emp.mobile}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(emp.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreationPage;
