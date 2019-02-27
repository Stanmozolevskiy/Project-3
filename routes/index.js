// const axios = require("axios");
const router = require("express").Router();
const mongojs = require("mongojs");
const User = require("../userModel");

// Database configuration
// Save the URL of our database as well as the name of our collection
const databaseUrl = "project";
const collections = ["users"];

// Use mongojs to hook the database to the db constiable
const db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// 1. At the root path, send a simple hello world message to the browser
router.get("/hello", function(req, res) {
  res.send("Hello world");
});

// 2. At the "/all" path, display every entry in the animals collection
router.get("/all", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.users.find({}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});


// Route to post our form submission to mongoDB via mongoose
router.post("/submit", function(req, res) {
  // Create a new user using req.body
  User.create(req.body)
    .then(function(dbUser) {
      // If saved successfully, send the the new User document to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});



// 4. just an example for sort by 
router.get("/weight", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  db.project.find().sort({ }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});


module.exports = router;
