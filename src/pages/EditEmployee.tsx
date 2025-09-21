import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<any>({});
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await updateDoc(doc(db, "employee", id), form);
        toast.success("✅ Employee updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/hrinfo"), 2000);
      } catch (error) {
        toast.error("❌ Failed to update employee");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Employee</h3>
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
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>

    </div>
  );
};

export default EditEmployee;
