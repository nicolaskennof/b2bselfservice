//Require NPMs for the server.
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("./config/passport");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;