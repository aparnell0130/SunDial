// eslint-disable-next-line no-unused-vars
const db = require("../models");
const { Op } = require("sequelize");
const express = require("express");
const date = new Date();
const today = date.toISOString().split("T")[0];
console.log(today);
const router = express.Router();
//I THINK THIS IS AN HTML ROUTE AND SHOULD BE MOVED TO THE HTML-ROUTES.JS FILE
router.get("/", (req, res) => {
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
router.get("/shift", (req, res) => {
  const userId = req.query.userId;
  renderShift();
  async function renderShift() {
    try {
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
            [Op.like]: today + "%"
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
              UserId: data.UserId,
              timeIn: data.timeIn,
              timeOut: data.timeOut
            };
          })
        };
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
        user: user
      });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
