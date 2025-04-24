//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent =
  " Welcome to our blog! We share insights, ideas, and inspiration every day. Stay tuned for exciting posts and community stories.";
const aboutContent =
  " We are a group of passionate developers and writers, committed to sharing knowledge and helping others grow.";
const contactContent =
  "Feel free to reach out to us with your thoughts, questions, or collaborations—we'd love to hear from you!";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
posts: posts
  });
  console.log(posts)
});

app.get("/contact", function (req, res) {
  res.render("contact", { contentContact: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", { contentAbout: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  var post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post)
  res.redirect("/")
})

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle == requestedTitle) {
  res.render("post", {
title: post.title,
content: post.content
  })
    } 
  })


})



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
