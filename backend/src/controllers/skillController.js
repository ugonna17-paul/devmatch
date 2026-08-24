const driver = require("../config/database");

const { getAllSkills } = require("../queries/skills");

const getSkills = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(getAllSkills);

    const skills = result.records.map((record) => {
      return record.get("skill").properties;
    });

    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Failed to get skills:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to get skills",
    });
  } finally {
    await session.close();
  }
};

module.exports = {
  getSkills,
};