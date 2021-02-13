// require folders and npm packages
const db = require("../models");
const { Op } = require("sequelize");
const express = require("express");
const isAuthenticated = require("../config/middleware/isAuthenticated");
/*=====================Get Current Day=====================*/
const date = new Date();
const today = new Date(date);
today.setHours(date.getHours() - 8);
const currentDay = today.toISOString().split("T")[0];
/*=====================Get Current Day=====================*/

const router = express.Router();

// render index page with users
router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("back");
  }
  db.User.findAll({}).then(users => {
    const usersObj = {
      names: users.map(data => {
        return {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName
        };
      })
    };
    res.render("index", { users: usersObj.names });
  });
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/shift");
  }
  res.render("login");
});

// render shift page with current users projects and instances
router.get("/shift", isAuthenticated, (req, res) => {
  const userId = req.query.userId;
  renderShift();
  async function renderShift() {
    try {
      let lastTimeOut;
      const projects = await db.Project.findAll({}).then(projects => {
        const projectsObj = {
          projects: projects.map(data => {
            return {
              id: data.id,
              projectName: data.projectName,
              projectNumber: data.projectNumber
            };
          })
        };
        return projectsObj.projects;
      });
      const instances = await db.Instance.findAll({
        where: {
          UserId: userId,
          timeIn: {
            [Op.like]: currentDay + "%"
          }
        },
        include: [db.Project]
      }).then(instances => {
        const instancesObj = {
          instance: instances.map(data => {
            return {
              id: data.id,
              projectName: data.Project.projectName,
              ProjectId: data.ProjectId,
              UserId: userId,
              timeIn: data.timeIn,
              timeOut: data.timeOut
            };
          })
        };
        if (instancesObj.instance.length > 0) {
          lastTimeOut =
            instancesObj.instance[instancesObj.instance.length - 1].timeOut;
        } else {
          lastTimeOut = "---";
        }
        return instancesObj.instance;
      });
      const user = await db.User.findAll({
        where: {
          id: userId
        }
      }).then(user => {
        const usersObj = {
          names: user.map(data => {
            return {
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName
            };
          })
        };
        return usersObj.names;
      });
      res.render("shift", {
        projects: projects,
        instances: instances,
        user: user,
        lastTimeOut: lastTimeOut
      });
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/projects", isAuthenticated, (req, res) => {
  db.User.findAll({}).then(users => {
    const usersObj = {
      names: users.map(data => {
        return {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName
        };
      })
    };
    res.render("projects", { users: usersObj.names });
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});
module.exports = router;
