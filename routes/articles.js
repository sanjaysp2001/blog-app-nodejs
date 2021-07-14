const express = require("express");
const Article = require("./../models/article");
const User = require("./../models/user");
const authenticate = require("../authenticate");
const router = express.Router();

router.get("/new", authenticate.verifyUser, (req, res, next) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", authenticate.verifyUser, async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

router.get("/:slug", authenticate.verifyUser, async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article, user: req.user });
});

router.post(
  "/",
  authenticate.verifyUser,
  async (req, res, next) => {
    req.article = new Article();
    req.article.author = req.user._id;
    //console.log(req.article);
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  authenticate.verifyUser,
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", authenticate.verifyUser, async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.author = req.user._id;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      //console.log(article);
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
