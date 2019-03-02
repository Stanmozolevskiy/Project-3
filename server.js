// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/index");
const PORT = process.env.PORT || 3001;
const path = require("path");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project");
// Add routes, both API and view
app.use(routes);

//serves up our react app on heroku
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
