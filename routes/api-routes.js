// eslint-disable-next-line no-unused-vars
const db = require("../models");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  db.User.findAll({}).then(users => {
    const usersObj = {
      names: users.map(data => {
        return {
          firstName: data.firstName,
          lastName: data.lastName
        };
      })
    };
    res.render("index", { users: usersObj.names });
  });
});

module.exports = router;
