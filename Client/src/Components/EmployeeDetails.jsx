import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Service/api";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch employee details");
      }
    };

    fetchEmployee();
  }, [id, token]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="card">
      <h3>Employee Details</h3>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Level:</strong> {employee.level}</p>
      <p><strong>Salary:</strong> ${employee.salary}</p>
      <p><strong>Joining Date:</strong> {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : "N/A"}</p>
      
      <button
        style={{ marginTop: "15px" }}
        onClick={() => navigate("/dashboard/employees")}
      >
        Back
      </button>
    </div>
  );
};

export default EmployeeDetails;
