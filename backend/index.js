const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const driver = require("./src/config/database");
const developerRoutes = require("./src/routes/developerRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const skillRoutes = require("./src/routes/skillRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/developers", developerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "DevMatch API is running",
  });
});

app.listen(PORT, async () => {
  try {
    await driver.verifyConnectivity();
    console.log(`DevMatch API running on port ${PORT}`);
    console.log("CognoDB connected successfully");
  } catch (error) {
    console.error("CognoDB connection failed:", error.message);
  }
});