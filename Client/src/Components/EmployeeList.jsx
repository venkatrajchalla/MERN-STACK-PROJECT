import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Service/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) setEmployees(res.data);
      else if (Array.isArray(res.data.employees)) setEmployees(res.data.employees);
      else setEmployees([]);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch employees");
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchEmployees();
    } catch {
      alert("Failed to delete employee");
    }
  };

  return (
    <div>
      <h3>Employee List</h3>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Level</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.role}</td>
                <td>{e.level}</td>
                <td>{e.salary}</td>
                <td>
                  {/* Correct Edit path */}
                  <button onClick={() => navigate(`/dashboard/employees/${e._id}/edit`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(e._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button style={{ marginTop: "15px" }} onClick={() => navigate("/dashboard")}>
        Back
      </button>
    </div>
  );
};

export default EmployeeList;
