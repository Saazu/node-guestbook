const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(request, response) {
  response.render("index");
})

app.get("/new-entry", function(request, response) {
  response.render("new-entry");
})

app.post("/new-entry", function(request, response) {
  if(!response.body.title || !response.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: request.body.title,
    content: response.body.body,
    published: new Date()
  })
  response.redirect("/");
})

app.use(function(request, response) {
  response.status(400).render("404");
})

http.createServer(app).listen(3000, function() {
  console.log("Guestbook app started on port 3000.");
})