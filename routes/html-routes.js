// eslint-disable-next-line no-unused-vars
const db = require("../models");
const express = require("express");

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
  db.Instance.findAll({
    where: {},
    include: [db.Project]
  }).then(instances => {
    const instancesObj = {
      instance: instances.map(data => {
        return {
          projectName: data.projectName,
          timeIn: data.timeIn,
          timeOut: data.timeOut
        };
      })
    };
    res.render("shift", { users: instancesObj.instance });
  });
});

module.exports = router;
