import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Service/api";

const EmployeeForm = () => {
  const { id } = useParams(); // id exists when editing
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    level: "Junior",
    salary: 0,
  });

  // Fetch existing employee data if editing
  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const res = await api.get(`/employees/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData(res.data);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch employee data");
        }
      };
      fetchEmployee();
    }
  }, [id, token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/employees/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/employees", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/dashboard/employees"); // go back to employee list
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{id ? "Edit" : "Add"} Employee</h3>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <input
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role"
        required
      />
      <select name="level" value={formData.level} onChange={handleChange}>
        <option>Junior</option>
        <option>Mid</option>
        <option>Senior</option>
        <option>Lead</option>
        <option>Manager</option>
      </select>
      <input
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        required
      />

      <div style={{ marginTop: "10px" }}>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => navigate("/dashboard/employees")}
          style={{ marginLeft: "10px" }}
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
