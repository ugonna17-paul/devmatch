const express = require("express");

const {
  getDevelopers,
  getDevelopersBySkillName,
  getDevelopersByProjectSkillName,
  getDeveloperProfileByName,
} = require("../controllers/developerController");

const {
    getConnectedDeveloperPairs,
} = require("../controllers/connectedDeveloperController");

const router = express.Router();

router.get("/", getDevelopers);

router.get("/by-skill", getDevelopersBySkillName);

router.get("/by-project-skill", getDevelopersByProjectSkillName);

router.get("/connections", getConnectedDeveloperPairs);

router.get("/profile/:name", getDeveloperProfileByName);

module.exports = router;