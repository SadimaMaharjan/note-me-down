// import Express.js
const express = require("express");

var uniqid = require("uniqid");

const fs = require("fs");

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require("path");

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Middleware for parsing JSON and urlencoded form data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static middleware pointing to the public folder
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// GET Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET /api/notes should read the db.json file and return all the saved data.

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", (error, data) => {
    if (error) throw error;
    res.json(JSON.parse(data));
  });
});

// POST api/notes should receive a new note to save and add it to db.json file
app.post("/api/notes", (req, res) => {
  let db = fs.readFileSync("db/db.json");
  db = JSON.parse(db);
  res.json(db);
  // creating body for note
  let userNote = {
    title: req.body.title,
    text: req.body.text,
    // creating unique id for each note
    id: uniqid(),
  };
  // pushing created note to be written in the db.json file
  db.push(userNote);
  fs.writeFileSync("db/db.json", JSON.stringify(db));
  res.json(db);
});

// DELETE should receive a query parameter that contains the id of a note to delete

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("db/db.json", (error, data) => {
    if (error) throw error;
    let notes = JSON.parse(data);
  });
});

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
