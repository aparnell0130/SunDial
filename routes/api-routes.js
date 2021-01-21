// eslint-disable-next-line no-unused-vars
const db = require("../models");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  // db.Users.findAll({}).then(( data ) => {
  //   console.log(data);
  res.render("index");
});

module.exports = router;
