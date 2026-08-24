const driver = require("../config/database");

const {
  getAllDevelopers,
  getDevelopersBySkill,
  getDevelopersByProjectSkill,
  getDeveloperProfile,
} = require("../queries/developers");

// Get all developers
const getDevelopers = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(getAllDevelopers);

    const developers = result.records.map((record) => {
      return record.get("developer").properties;
    });

    res.json({
      success: true,
      data: developers,
    });
  } catch (error) {
    console.error("Failed to get developers:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to get developers",
    });
  } finally {
    await session.close();
  }
};

// Get developers by skill
const getDevelopersBySkillName = async (req, res) => {
  const session = driver.session();
  const { skill } = req.query;

  try {
    const result = await session.run(getDevelopersBySkill, {
      skill,
    });

    const developers = result.records.map((record) => {
      return record.get("developer").properties;
    });

    res.json({
      success: true,
      data: developers,
    });
  } catch (error) {
    console.error("Failed to find developers:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to find developers",
    });
  } finally {
    await session.close();
  }
};

// Get a developer profile with skills and projects
const getDeveloperProfileByName = async (req, res) => {
  const session = driver.session();
  const { name } = req.params;

  try {
    const result = await session.run(getDeveloperProfile, {
      name,
    });

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    const record = result.records[0];

    const developer = record.get("developer").properties;

    const skills = record.get("skills").map((skill) => skill.properties);

    const projects = record
      .get("projects")
      .map((project) => project.properties);

    res.json({
      success: true,
      data: {
        developer,
        skills,
        projects,
      },
    });
  } catch (error) {
    console.error("Failed to get developer profile:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to get developer profile",
    });
  } finally {
    await session.close();
  }
};

// Get developers, projects and skills through a multi-hop traversal
const getDevelopersByProjectSkillName = async (req, res) => {
  const session = driver.session();
  const { skill } = req.query;

  try {
    const result = await session.run(getDevelopersByProjectSkill, {
      skill,
    });

    const data = result.records.map((record) => {
      return {
        developer: record.get("developer").properties,
        project: record.get("project").properties,
        skill: record.get("skill").properties,
      };
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Failed to run developer project skill query:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to find developer project information",
    });
  } finally {
    await session.close();
  }
};

module.exports = {
  getDevelopers,
  getDevelopersBySkillName,
  getDevelopersByProjectSkillName,
  getDeveloperProfileByName,
};