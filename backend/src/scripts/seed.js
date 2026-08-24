require("dotenv").config();

const driver = require("../config/database");

const seedDatabase = async () => {
    const session = driver.session();

    try {
        // Clear existing data
        await session.run(`
      MATCH (node)
      DETACH DELETE node
    `);

        // Create developers
        await session.run(
            `
        UNWIND $developers AS developer
        CREATE (:Developer {
          name: developer.name,
          role: developer.role,
          location: developer.location,
          available: developer.available,
          bio: developer.bio
        })
      `,
            {
                developers: [
                    {
                        name: "Sarah Chen",
                        role: "Full Stack Developer",
                        location: "San Francisco, CA",
                        available: true,
                        bio: "Builds modern web applications and APIs.",
                    },
                    {
                        name: "David Okafor",
                        role: "Backend Developer",
                        location: "Lagos, Nigeria",
                        available: true,
                        bio: "Specializes in Node.js and scalable backend systems.",
                    },
                    {
                        name: "Maya Johnson",
                        role: "Frontend Developer",
                        location: "Austin, TX",
                        available: false,
                        bio: "Creates accessible and responsive user interfaces.",
                    },
                ],
            }
        );

        // Create skills
        await session.run(
            `
        UNWIND $skills AS skill
        CREATE (:Skill {
          name: skill.name,
          category: skill.category
        })
      `,
            {
                skills: [
                    { name: "React", category: "Frontend" },
                    { name: "Node.js", category: "Backend" },
                    { name: "JavaScript", category: "Programming" },
                    { name: "Neo4j", category: "Database" },
                    { name: "CSS", category: "Frontend" },
                ],
            }
        );

        // Create projects
        await session.run(
            `
        UNWIND $projects AS project
        CREATE (:Project {
          name: project.name,
          description: project.description
        })
      `,
            {
                projects: [
                    {
                        name: "DevMatch",
                        description:
                            "A platform for discovering developers by skills and projects.",
                    },
                    {
                        name: "HealthTrack",
                        description:
                            "A health tracking application for monitoring daily activities.",
                    },
                    {
                        name: "ShopFlow",
                        description:
                            "An e-commerce platform for managing products and orders.",
                    },
                ],
            }
        );

        // Developer -> Skill relationships
        const developerSkills = [
            ["Sarah Chen", "React"],
            ["Sarah Chen", "JavaScript"],
            ["David Okafor", "Node.js"],
            ["David Okafor", "Neo4j"],
            ["Maya Johnson", "React"],
            ["Maya Johnson", "CSS"],
        ];

        for (const [developerName, skillName] of developerSkills) {
            await session.run(
                `
          MATCH (developer:Developer {name: $developerName})
          MATCH (skill:Skill {name: $skillName})
          CREATE (developer)-[:HAS_SKILL]->(skill)
        `,
                {
                    developerName,
                    skillName,
                }
            );
        }

        // Developer -> Project relationships
        const developerProjects = [
            ["Sarah Chen", "DevMatch"],
            ["David Okafor", "HealthTrack"],
            ["Maya Johnson", "ShopFlow"],
        ];

        for (const [developerName, projectName] of developerProjects) {
            await session.run(
                `
          MATCH (developer:Developer {name: $developerName})
          MATCH (project:Project {name: $projectName})
          CREATE (developer)-[:WORKED_ON]->(project)
        `,
                {
                    developerName,
                    projectName,
                }
            );
        }

        // Project -> Skill relationships
        const projectSkills = [
            ["DevMatch", "React"],
            ["DevMatch", "JavaScript"],
            ["HealthTrack", "Node.js"],
            ["ShopFlow", "React"],
        ];

        for (const [projectName, skillName] of projectSkills) {
            await session.run(
                `
          MATCH (project:Project {name: $projectName})
          MATCH (skill:Skill {name: $skillName})
          CREATE (project)-[:USES_SKILL]->(skill)
        `,
                {
                    projectName,
                    skillName,
                }
            );
        }

        console.log("Seed data created successfully");
    } catch (error) {
        console.error("Failed to seed database:", error.message);
    } finally {
        await session.close();
        await driver.close();
    }
};

seedDatabase();