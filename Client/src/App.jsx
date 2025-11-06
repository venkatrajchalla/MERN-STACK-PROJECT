import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Register from "../src/Pages/RegisterPage";
import LoginPage from "../src/Pages/LoginPage";
import Dashboard from "./Components/Dashboard";
import EmployeeList from "./Components/EmployeeList";
import EmployeeForm from "./Components/EmployeeForm";
import ProtectedRoute from "./Components/ProtectedRoutes";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import "./App.css";

function Navbar() {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <nav className="topnav">
      <div className="nav-left">
        <Link to="/">EMS</Link>
      </div>
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="nav-user">
              Hi, {user.fullName} ({user.role})
            </span>
            <button className="linkish" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <div className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<h2>Welcome to Employee Management App 🚀</h2>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Dashboard with nested routes */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="employees" replace />} />
              <Route path="employees" element={<EmployeeList />} />
              <Route path="employees/add" element={<EmployeeForm />} />
              <Route path="employees/:id/edit" element={<EmployeeForm />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
