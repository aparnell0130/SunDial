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

router.get("/api/:id", (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(users => {
    return res.json(users);
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
  console.log("/api/newProject", req.body);
  db.Project.create({
    projectNumber: req.body.projectNumber,
    projectName: req.body.projectName
  })
    .then(newProject => {
      res.json(newProject);
    })
    .catch(err => {
      if (err) {
        return res.status(500).json({ success: false });
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
//INSTANCE POST REQUEST
router.post("/api/newInstance", (req, res) => {
  console.log(req.body);
  db.Instance.create({
    ProjectId: req.body.projectId, //keys must match mysql column tags
    UserId: req.body.userId,
    timeIn: req.body.timeIn,
    timeOut: req.body.timeOut
  })
    .then(instanceData => {
      res.json(instanceData);
    })
    .catch(err => {
      console.log(err);
      if (err) {
        return res.status(500).json({ success: false });
      }
    });
});
module.exports = router;
