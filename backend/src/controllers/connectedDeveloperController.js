const driver = require("../config/database");

const { getConnectedDevelopers } = require("../queries/developers");

const getConnectedDeveloperPairs = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(getConnectedDevelopers);

    const connections = result.records.map((record) => {
      return {
        developer1: record.get("developer1").properties,
        developer2: record.get("developer2").properties,
        project: record.get("project").properties,
        skill: record.get("skill").properties,
      };
    });

    res.json({
      success: true,
      data: connections,
    });
  } catch (error) {
    console.error("Failed to find connected developers:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to find connected developers",
    });
  } finally {
    await session.close();
  }
};

module.exports = {
  getConnectedDeveloperPairs,
};