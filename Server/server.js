// index.js
const express = require("express");
const dotenv = require("dotenv");  // just require dotenv
dotenv.config();                    // then call config()
const cors = require("cors");
const connectDB = require("./Config/db");

// Routers
const authRouter = require("./Routers/authRoutes");
const employeeRouter = require("./Routers/employeeRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Debug: check if env variable is loaded
console.log("MongoDB URI:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// Routers
app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
