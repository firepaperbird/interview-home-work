const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");
const passport = require("passport");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

mongoose.connect(process.env.Database || "mongodb://localhost/zblog");
mongoose.set("debug", false);
mongoose.promise = global.Promise;

//registered for model
require("./models/BlogPost");
require("./models/User");
const initAuth = require("./util/auth.js");

initAuth();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(
  session({
    secret: "ZigvyBlog",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(errorHandler());

app.use(require("./routes"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: err,
    },
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
