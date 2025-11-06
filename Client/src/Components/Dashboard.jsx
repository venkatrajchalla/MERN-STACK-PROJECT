import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        {/* ✅ Use absolute paths for clarity */}
        <button onClick={() => navigate("/dashboard/employees/add")}>
          Add Employee
        </button>
        <button onClick={() => navigate("/dashboard/employees")}>
          Employee List
        </button>
      </div>

      {/* ✅ Nested routes will render here */}
      <div style={{ marginTop: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
