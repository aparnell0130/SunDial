// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../public/assets/views/index.handlebars")
    );
  });

  app.get("/shift", (req, res) => {
    res.render("shift", {});
  });
};
