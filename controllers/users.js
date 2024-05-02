const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password should be a least 6 characters",
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          return res.status(409).json({
            success: false,
            error:
              "The email address is already registered. Please use a different email.",
          });
        } else {
          const newUser = new User({
            first_name,
            last_name,
            username,
            email,
            password,
          });

          // Mash Password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // Set password to hashed
              newUser.password = hash;
              // Save user
              const user = newUser.save();
              return res.status(201).json({
                success: true,
                data: "user registered",
              });
            })
          );
        }
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};

exports.loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message,
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
