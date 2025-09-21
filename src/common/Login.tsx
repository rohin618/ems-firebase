import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"HR" | "EMP">("HR");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Query Firestore by name
      const q = query(
        collection(db, "users"),
        where("name", "==", name)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("User not found!");
        return;
      }

      let userData: any;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      // Check password
      if (userData.password !== password) {
        setError("Incorrect password");
        return;
      }

      // Check role
      if (userData.role !== activeTab) {
        setError("Invalid role for this account");
        return;
      }

      // Save token (here just uid) and role in localStorage
      localStorage.setItem("Auth_token", querySnapshot.docs[0].id); // doc id as token
      localStorage.setItem("role", userData.role);

      toast.success(` Logged in as ${userData.role}`);
      if(userData.role === "HR") {navigate('/hrinfo')} else {navigate('/emsinfo')}
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "HR" ? "active" : ""}`}
            onClick={() => setActiveTab("HR")}
          >
            HR
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "EMP" ? "active" : ""}`}
            onClick={() => setActiveTab("EMP")}
          >
            Employee
          </button>
        </li>
      </ul>

      <div className="card shadow p-4">
        <h3 className="text-center mb-3">{activeTab} Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
