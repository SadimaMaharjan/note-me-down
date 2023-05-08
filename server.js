// import Express.js
const express = require("express");

const { v4: uuidv4 } = require("uuid");

//import file system
const fs = require("fs");

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require("path");

// Import database
const noteData = require("./db/db.json");

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  fs.readFile("./db/db.json", (error, data) => {
    if (error) throw error;
    res.json(JSON.parse(data));
  });
});

// POST api/notes should receive a new note to save and add it to db.json file
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
});

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
