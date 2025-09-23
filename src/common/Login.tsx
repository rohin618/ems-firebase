import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContest";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"HR" | "EMP">("HR");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuthContext();

  // ✅ Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const collectionName = activeTab === "HR" ? "users" : "employee";
      const q = query(collection(db, collectionName), where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("User not found!");
        return;
      }

      let userData: any;
      querySnapshot.forEach((doc) => {
        userData = { id: doc.id, ...doc.data() };
      });

      if (!userData) {
        setError("User not found!");
        return;
      }

      // ✅ check password
      if (userData.password !== password) {
        setError("Incorrect password");
        return;
      }

      // ✅ check role for HR
      if (activeTab === "HR" && userData.role !== "HR") {
        setError("Invalid role for this account");
        return;
      }

      // ✅ Save in AuthContext
      login(userData.id, activeTab, userData.name);
      toast.success(`Logged in as ${activeTab}`);

      if (activeTab === "HR") {
        navigate("/hrinfo");
      } else {
        navigate("/emsinfo");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  // ✅ Handle Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const collectionName = activeTab === "HR" ? "users" : "employee";
      const q = query(collection(db, collectionName), where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("User not found!");
        return;
      }

      const userDoc = querySnapshot.docs[0].ref;
      await updateDoc(userDoc, { password: newPassword });

      toast.success("Password updated successfully!");
      setForgotMode(false);
      setName("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
        <h3 className="text-center mb-3">
          {forgotMode ? "Reset Password" : `${activeTab} Login`}
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        {!forgotMode ? (
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

            <p className="text-center mt-2">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setForgotMode(true)}
              >
                Forgot Password?
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Reset Password
            </button>

            <p className="text-center mt-2">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setForgotMode(false)}
              >
                Back to Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
