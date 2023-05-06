//Assignment 5
const express = require("express");
const app = express();
const path = require("path");
const rootDir = require("./util/path");
const bodyParser = require("body-parser");
const users = [];

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", (req, res, next) => {
  res.render("userslist", { users: users });
});
app.get("/add-users", (req, res, next) => {
  //   res.sendFile(path.join(rootDir, "views", "users.html"));
  res.render("users");
});
app.post("/add-users", (req, res, next) => {
  users.push({ username: req.body.username });
  res.redirect("/users");
});
app.use("/", (req, res, next) => {
  res.send("<h1>hey there</h1>");
});
app.listen(3000);
module.exports = users;
