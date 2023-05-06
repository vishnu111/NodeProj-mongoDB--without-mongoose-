//Assignment 2
const express = require("express");
const app = express();
app.use("/users", (req, res, next) => {
  res.send("<h1>This is users page</h1>");
});
app.use("/", (req, res, next) => {
  res.send("<h1>This is default home page</h1>");
});
app.listen(3000);
