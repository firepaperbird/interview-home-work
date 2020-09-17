const mongoose = require("mongoose");
const router = require("express").Router();
const BlogPost = mongoose.model("BlogPost");

router.get("/", (req, res, next) => {
  return BlogPost.find()
    .sort({ created: "descending" })
    .then((blogs) => res.json({ blogPosts: blogs.map((p) => p.toJSON()) })) // cat noi dung 100 chu~
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  return BlogPost.findById(id, (err, blg) => {
    if (err) {
      return res.sendStatus(404);
    } else if (blg) {
      return res.json({ blogPost: blg.toJSON() });
    }
  }).catch(next);
});

router.get("/search/:value", (req, res, next) => {
  const search = req.params.value;
  return BlogPost.find(
    {$or:[
      { 'title' : { '$regex' : search, '$options' : 'i' } },
      { 'tags' : { '$regex' : search, '$options' : 'i' } }
    ]},
    (err, blg) => {
    if (err) {
      return res.json({ results: [], msg:"not found" });
    } else if (blg) {
      return res.json({ results: blg });
    }
  }).catch(next);
});

router.post("/", (req, res, next) => {
  const { body } = req;

  console.log(body);
  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: "is required",
      },
    });
  }

  if (!body.author) {
    return res.status(422).json({
      errors: {
        author: "is required",
      },
    });
  }

  if (!body.content) {
    return res.status(422).json({
      errors: {
        content: "is required",
      },
    });
  }

  const newBlogPost = new BlogPost(body);
  return newBlogPost
    .save()
    .then(() => res.json({ blogPost: newBlogPost.toJSON() }))
    .catch(next);
});

router.patch("/:id", (req, res, next) => {
  let updateBlog = {};

  const { body } = req;
  if (typeof body.title !== "undefined") {
    updateBlog.title = body.title;
  }

  if (typeof body.author !== "undefined") {
    updateBlog.author = body.author;
  }

  if (typeof body.tags !== "undefined") {
    updateBlog.tags = body.tags;
  }

  if (typeof body.content !== "undefined") {
    updateBlog.content = body.content;
  }

  return BlogPost.findOneAndUpdate({ id: req.params.id }, updateBlog)
    .then(() => res.json({ blogPost: updateBlog }))
    .catch(next);
});
router.delete("/:id", (req, res, next) => {
  return Articles.findOneAndUpdate({ id: req.params.id }, { deleted: true })
    .then(() => res.sendStatus(200))
    .catch(next);
});
module.exports = router;
