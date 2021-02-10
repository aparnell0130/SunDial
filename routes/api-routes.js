// eslint-disable-next-line no-unused-vars
const { Op } = require("sequelize");
const db = require("../models");
const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
/*=====================Get Current Day=====================*/
const date = new Date();
const today = new Date(date);
today.setHours(date.getHours() - 8);
const currentDay = today.toISOString().split("T")[0];
/*=====================Get Current Day=====================*/

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

router.get("/api/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

router.get("/api/user/:id", (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(users => {
    return res.json(users);
  });
});

router.post("/api/newUser", (req, res) => {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
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
  db.Project.findAll({}).then(projects => {
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

router.get("/api/project/:id", (req, res) => {
  console.log(req.params.id);
  db.Project.findOne({
    where: {
      id: req.params.id
    }
  }).then(data => {
    // console.log(data);
    return res.json(data);
  });
});

//INSTANCE POST REQUEST
router.post("/api/newInstance", (req, res) => {
  db.Instance.create({
    ProjectId: req.body.projectId,
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

// //GET INSTANCES FOR END SHIFT BUTTON BY USER (WE WILL NEED TO FOCUS THIS TO FILTER ALSO BY DAY)
router.get("/api/chartingInstances/:activeUser", (req, res) => {
  console.log(req.params.activeUser);
  db.Instance.findAll({
    where: {
      UserId: req.params.activeUser,
      timeIn: {
        [Op.like]: currentDay + "%"
      }
    },
    include: [db.Project]
  }).then(instancesData => {
    const instancesObj = {
      instance: instancesData.map(data => {
        return {
          id: data.id,
          projectName: data.Project.projectName,
          ProjectId: data.ProjectId,
          UserId: data.UserId,
          timeIn: data.timeIn,
          timeOut: data.timeOut
        };
      })
    };
    return res.json(instancesObj.instance);
  });
});
router.get("/api/chartingInstances/all/:activeUser", (req, res) => {
  console.log(req.params.activeUser);
  db.Instance.findAll({
    where: {
      UserId: req.params.activeUser
    },
    include: [db.Project]
  }).then(instancesData => {
    const instancesObj = {
      instance: instancesData.map(data => {
        return {
          id: data.id,
          projectName: data.Project.projectName,
          ProjectId: data.ProjectId,
          UserId: data.UserId,
          timeIn: data.timeIn,
          timeOut: data.timeOut
        };
      })
    };
    return res.json(instancesObj.instance);
  });
});
module.exports = router;
