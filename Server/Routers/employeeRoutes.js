const express = require('express');
const { 
  addEmployee, 
  getEmployee, 
  getEmployeeById,   // ✅ import added
  updateEmployee, 
  promoteEmployee, 
  deleteEmployee, 
  incrementSalary 
} = require('../Controllers/employeeContoller');

const Protect = require('../Middleware/authMiddleware');

const EmployeeRouter = express.Router();

// Add employee
EmployeeRouter.post("/", Protect, addEmployee);

// Get all employees (with pagination + search + filter)
EmployeeRouter.get("/", Protect, getEmployee);

// ✅ Get single employee by ID
EmployeeRouter.get("/:id", Protect, getEmployeeById);

// Update employee
EmployeeRouter.put("/:id", Protect, updateEmployee);

// ✅ Delete employee (was PUT before)
EmployeeRouter.delete("/:id", Protect, deleteEmployee);

// Promote employee
EmployeeRouter.put("/:id/promote", Protect, promoteEmployee);

// Increment salary
EmployeeRouter.put("/:id/salary", Protect, incrementSalary);

module.exports = EmployeeRouter;
