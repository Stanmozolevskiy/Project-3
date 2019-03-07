// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const PORT = process.env.PORT || 3001;
const path = require("path");


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project");
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
require('./routes')(app);

//serves up our react app on heroku
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get('/name', (req, res) => {
  mongoose.find().toArray( (err, results) => {
    res.send(results)
  });
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
