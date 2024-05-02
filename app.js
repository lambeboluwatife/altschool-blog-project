const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const blogs = require("./routes/blogs");
const users = require("./routes/users");

const app = express();

app.use(express.json());

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/blogs", blogs);
app.use("/users", users);

app.all("*", (req, res) => {
  res.status(404).send("404 - route not found");
});

const PORT = process.env.PORT || 4000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
