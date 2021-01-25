// eslint-disable-next-line no-unused-vars
const db = require("../models");
const express = require("express");

const router = express.Router();

router.get("/api/users", (req, res) => {
  db.User.findAll({}).then(users => {
    const usersObj = {
      names: users.map(data => {
        return {
          firstName: data.firstName,
          lastName: data.lastName
        };
      })
    };
    res.json({ users: usersObj.names });
  });
});
router.post("/api/newUser", (req, res) => {
  console.log(req.body);
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
    .then(newUser => {
      res.json(newUser);
    })
    .catch(err => {
      if (err) {
        return res.status(500).json({ sucess: false });
      }
    });
});
router.post("/api/newProject", (req, res) => {
  console.log(req.body);
  db.Project.create({
    projectNumber: req.body.projectNumber,
    projectName: req.body.projectName
  })
    .then(newProject => {
      res.json(newProject);
    })
    .catch(err => {
      if (err) {
        return res.status(500).json({ sucess: false });
      }
    });
});
router.get("/api/projects", (req, res) => {
  db.User.findAll({}).then(projects => {
    const projectsObj = {
      projects: projects.map(data => {
        return {
          projectName: data.projectName,
          projectNumber: data.projectNumber
        };
      })
    };
    res.json({ projects: projectsObj.projects });
  });
});
module.exports = router;
