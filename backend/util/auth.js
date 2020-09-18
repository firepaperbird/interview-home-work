const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTstrategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = mongoose.model("User");

const isValidPassword = async (user, password) => {
  return bcrypt.compare(password, user.password || "");
};

module.exports = function initAuth() {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, {
              message: "Invalid username or password",
            });
          }
          const validate = await isValidPassword(user, password);
          if (!validate) {
            return done(null, false, {
              code: 400,
              message: "Invalid username or password",
            });
          }
          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          logger.error({ time: new Date(), error });
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTstrategy(
      {
        secretOrKey: process.env.JWT_SECRET || "secret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
