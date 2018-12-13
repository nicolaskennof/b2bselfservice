// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {

    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", function(req, res) {

    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {

    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
   
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {

    var hbsObject = req.user;
    
    db.Order.findAll({
      where: {
        email: req.user.email
      },
      include: [db.Product]
    }).then(function(data) {
      hbsObject.orders = data;
      for (var i = 0; i < hbsObject.orders.length; i++) {
        hbsObject.orders[i].Product.unitaryPrice = hbsObject.orders[
          i
        ].Product.unitaryPrice.toFixed(2);
        hbsObject.orders[i].dataValues.newIndex = i + 1;
        hbsObject.orders[i].dataValues.subtotal = (
          hbsObject.orders[i].dataValues.quantity *
          hbsObject.orders[i].dataValues.Product.unitaryPrice
        ).toFixed(2);
        hbsObject.orders[i].dataValues.vat = (
          parseFloat(hbsObject.orders[i].dataValues.subtotal) * 0.16
        ).toFixed(2);
        hbsObject.orders[i].dataValues.total = (
          parseFloat(hbsObject.orders[i].dataValues.subtotal) +
          parseFloat(hbsObject.orders[i].dataValues.vat)
        ).toFixed(2);

        if (hbsObject.orders[i].delivered) {
          hbsObject.orders[i].dataValues.status = "entregado";
        } else {
          hbsObject.orders[i].dataValues.status = "no entregado";
        }
      }
      res.render("members", hbsObject);
    });
  });

  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });
};
