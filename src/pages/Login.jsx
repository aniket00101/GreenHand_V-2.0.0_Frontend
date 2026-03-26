// src/pages/Login.jsx
import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
        <button>Login</button>
      </form>
    </div>
  );
}