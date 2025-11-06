const Employee = require("../Models/EmployeeModel");

// Add employee
const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to add employee", details: err.message });
  }
};

// Get employees with pagination + search + filter
const getEmployee = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "", department = "" } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }
    if (department) {
      query.department = department;
    }

    const total = await Employee.countDocuments(query);
    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      employees,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to fetch employees", details: err.message });
  }
};

// ✅ Get single employee by ID (for edit form)
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found ❌" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to fetch employee", details: err.message });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ error: "Employee not found ❌" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to update employee", details: err.message });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found ❌" });
    res.json({ message: "✅ Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to delete employee", details: err.message });
  }
};

// Promote employee
const promoteEmployee = async (req, res) => {
  try {
    const { newLevel } = req.body;
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ error: "Employee not found ❌" });

    let incrementPercent = 0;
    switch (newLevel) {
      case "Mid":
        incrementPercent = 10;
        break;
      case "Senior":
        incrementPercent = 8;
        break;
      case "Lead":
        incrementPercent = 5;
        break;
      case "Manager":
        incrementPercent = 3;
        break;
      default:
        incrementPercent = 0;
    }

    employee.salary += (employee.salary * incrementPercent) / 100;
    employee.level = newLevel;

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to promote employee", details: err.message });
  }
};

// Increment salary by fixed amount
const incrementSalary = async (req, res) => {
  try {
    const { amount } = req.body; 
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ error: "Employee not found ❌" });

    employee.salary += Number(amount);
    await employee.save();

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to increment salary", details: err.message });
  }
};

module.exports = {
  addEmployee,
  getEmployee,
  getEmployeeById,   // ✅ export added function
  updateEmployee,
  deleteEmployee,
  promoteEmployee,
  incrementSalary,
};
