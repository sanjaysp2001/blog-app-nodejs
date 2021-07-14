const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const User = require("./models/user");
const articleRouter = require("./routes/articles");
const userRouter = require("./routes/users");
const config = require("./config");
const methodOverride = require("method-override");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authenticate = require("./authenticate");
const app = express();

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(cookieParser());

app.get("/", async (req, res) => {
  if (req.cookies["jwt"]) {
    jwt.verify(req.cookies["jwt"], config.secretKey, function (err, decoded) {
      if (!err) {
        res.redirect("/all");
      } else res.render("login");
    });
  } else {
    res.render("login");
  }
});
app.get("/all", authenticate.verifyUser, async (req, res) => {
  const articles = await Article.find()
    .sort({ createdAt: "desc" })
    .populate("author");
  console.log(articles);
  res.render("articles/index", {
    articles: articles,
    user: req.user,
  });
});

app.use("/articles", articleRouter);
app.use("/users", userRouter);

app.listen(5000);
console.log("server started at localhost:5000");
