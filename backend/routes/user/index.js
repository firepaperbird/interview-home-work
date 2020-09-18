const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        throw err;
      }
      if (!user && info) {
        return next({ message: info.message, status: 400 });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) throw error;
        try {
          const body = { username: user.username };
          const token = jwt.sign(
            {
              exp: 60000,
              user: body,
            },
            process.env.JWT_SECRET || "secret"
          );
          return res.json({ success: true, token, username: user.username });
        } catch (error) {
          return next(error);
        }
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    return User.find()
      .sort({ created: "descending" })
      .then((blogs) => res.json({ Users: blogs.map((p) => p.toJSON()) })) // cat noi dung 100 chu~
      .catch(next);
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const id = req.params.id;
    return User.findById(id, (err, blg) => {
      if (err) {
        return res.sendStatus(404);
      } else if (blg) {
        return res.json({ User: blg.toJSON() });
      }
    }).catch(next);
  }
);

router.post("/", async (req, res, next) => {
  const { body } = req;
  if (!body.username) {
    return res.status(422).json({
      errors: {
        username: "is required",
      },
    });
  }

  if (!body.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }
  body.password = await bcrypt.hash(body.password, SALT_ROUNDS);
  const newUser = new User(body);
  return newUser
    .save()
    .then(() => res.json({ User: newUser.toJSON() }))
    .catch(next);
});

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    let updateBlog = {};

    const { body } = req;
    if (typeof body.username !== "undefined") {
      updateBlog.username = body.username;
    }

    if (typeof body.password !== "undefined") {
      updateBlog.password = body.password;
      body.password = await bcrypt.hash(body.password, SALT_ROUNDS);
    }

    return User.findOneAndUpdate({ id: req.params.id }, updateBlog)
      .then(() => res.json({ User: updateBlog }))
      .catch(next);
  }
);
router.delete("/:id", async (req, res, next) => {
  return Articles.findOneAndUpdate({ id: req.params.id }, { deleted: true })
    .then(() => res.sendStatus(200))
    .catch(next);
});

const isValidPassword = async (user, password) => {
  return bcrypt.compare(password, user.password || "");
};

module.exports = router;
