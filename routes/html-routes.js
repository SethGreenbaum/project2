// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("index", {});
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login", {});
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("signup", {});
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, enpven a hashed password, isn't a good idea
      db.Like.findAll({
        where: {
          UserId: req.user.id
        },
        include: [db.Post]
      }).then(function(hist) {
        db.Post.findAll({}).then(function(posts) {
          db.Post.findAll({
            where: {
              UserId: req.user.id
            }
          }).then(function(mine) {
            var homePage = { likes: hist, feed: posts, postHist: mine };
            console.log(homePage);
            res.render("members", homePage);
          });
        });
      });
    }
  });
};
