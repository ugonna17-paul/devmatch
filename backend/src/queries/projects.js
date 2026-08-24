const getAllProjects = `
MATCH (project:Project)
RETURN project
ORDER BY project.name
`;

const getProjectByName = `
MATCH (project:Project)
WHERE project.name = $name

OPTIONAL MATCH (developer:Developer)-[:WORKED_ON]->(project)
OPTIONAL MATCH (project)-[:USES_SKILL]->(skill:Skill)

RETURN
  project,
  collect(DISTINCT developer) AS developers,
  collect(DISTINCT skill) AS skills
`;

module.exports = {
  getAllProjects,
  getProjectByName,
};