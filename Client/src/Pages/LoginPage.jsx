import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import api from "../Service/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to backend login route
      const res = await api.post("/auth/login", { email, password });

      // Backend returns { token, user }
      login(res.data); // stores token & user in AuthContext and localStorage

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      // Properly handle backend errors
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submit} className="card">
        <h3>Login</h3>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
