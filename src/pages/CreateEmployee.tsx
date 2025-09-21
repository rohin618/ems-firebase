import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEmployee: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "employee"), form);
      toast.success("✅ Employee created successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 2000); // redirect after toast
    } catch (error) {
      toast.error("❌ Failed to create employee");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create Employee</h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key}</label>
            <input
              type="text"
              name={key}
              value={(form as any)[key]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>

    </div>
  );
};

export default CreateEmployee;
