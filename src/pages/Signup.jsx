// src/pages/Signup.jsx
import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
        <button>Signup</button>
      </form>
    </div>
  );
}