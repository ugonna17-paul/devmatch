const driver = require("../config/database");

const {
  getAllProjects,
  getProjectByName,
} = require("../queries/projects");

// Get all projects
const getProjects = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(getAllProjects);

    const projects = result.records.map((record) => {
      return record.get("project").properties;
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Failed to get projects:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to get projects",
    });
  } finally {
    await session.close();
  }
};

// Get project details by name
const getProject = async (req, res) => {
  const session = driver.session();
  const { name } = req.query;

  try {
    const result = await session.run(getProjectByName, {
      name,
    });

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const record = result.records[0];

    const project = record.get("project").properties;

    const developers = record
      .get("developers")
      .filter(Boolean)
      .map((developer) => developer.properties);

    const skills = record
      .get("skills")
      .filter(Boolean)
      .map((skill) => skill.properties);

    res.json({
      success: true,
      data: {
        project,
        developers,
        skills,
      },
    });
  } catch (error) {
    console.error("Failed to get project:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to get project",
    });
  } finally {
    await session.close();
  }
};

module.exports = {
  getProjects,
  getProject,
};