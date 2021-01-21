const db = require("../models");

module.exports = app => {
  app.get("/api/user", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({}).then(data => {
      res.render("index", data);
    });
  });
};
