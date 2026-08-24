const getAllSkills = `
MATCH (skill:Skill)
RETURN skill
ORDER BY skill.name
`;

module.exports = {
  getAllSkills,
};