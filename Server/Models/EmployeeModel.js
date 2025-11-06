const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  level: {
    type: String,
    enum: ["Junior", "Mid", "Senior", "Lead", "Manager"], // ✅ Fixed case
    default: "Junior",
  },
  salary: { type: Number, required: true },
  joiningDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
