import React, { useState } from "react";
import api from "../Service/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [fullName, setFullName] = useState(""); // ✅ use fullName
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); // ✅ correct casing
    try {
      await api.post("/auth/register", { fullName, email, password, role }); // match state names
      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Register</h3>
      <input
        type="text"
        value={fullName}  // ✅ use fullName
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter Full Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        type="password"
        value={password}  // ✅ use password
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Employee</option>
        <option>Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
