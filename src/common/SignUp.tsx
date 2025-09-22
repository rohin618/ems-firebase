import React, { useState } from "react";
import { db } from "../firebase-config"; // Firestore instance
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface UserProps {
  name: string;
  password: string;
  role: "HR" | "EMP";
}

const HRSignUp: React.FC = () => {
  const [user, setUser] = useState<UserProps>({
    name: "",
    password: "",
    role: "HR", // fixed role for this signup
  });
const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usersCollection = collection(db, "users");
      await addDoc(usersCollection, user); // store only name, password, role
      toast.success("HR registered successfully!");
      setUser({ name: "", password: "", role: "HR" }); // reset form
        navigate('/login');
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to register HR.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center m-2">HR Registration</h2>
      <form className="login-content" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register HR
        </button>
      </form>
    </div>
  );
};

export default HRSignUp;
