const getAllDevelopers = `
MATCH (developer:Developer)
RETURN developer
ORDER BY developer.name
`;

const getDevelopersBySkill = `
MATCH (developer:Developer)-[:HAS_SKILL]->(skill:Skill)
WHERE skill.name = $skill
RETURN developer
ORDER BY developer.name
`;

const getDevelopersByProjectSkill = `
MATCH (developer:Developer)-[:WORKED_ON]->(project:Project)-[:USES_SKILL]->(skill:Skill)
WHERE skill.name = $skill
RETURN DISTINCT developer, project, skill
ORDER BY developer.name
`;

const getConnectedDevelopers = `
  MATCH (developer1:Developer)-[:WORKED_ON]->(project:Project)
        -[:USES_SKILL]->(skill:Skill)
        <-[:HAS_SKILL]-(developer2:Developer)
  WHERE developer1.name < developer2.name
  RETURN DISTINCT developer1, developer2, project, skill
  ORDER BY developer1.name
`;

const getDeveloperProfile = `
  MATCH (d:Developer {name: $name})

  OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
  OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)

  RETURN
    d AS developer,
    collect(DISTINCT s) AS skills,
    collect(DISTINCT p) AS projects
`;

module.exports = {
  getAllDevelopers,
  getDevelopersBySkill,
  getDevelopersByProjectSkill,
  getDeveloperProfile,
  getConnectedDevelopers,
};