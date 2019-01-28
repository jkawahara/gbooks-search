// *** Include Modules: npm (express, path, morgan, mongoose), /routes
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes")

// Set PORT to Heroku process.env.PORT (deployed) or 3001 (localhost)
const PORT = process.env.PORT || 3001;

// Initialize Express
const app = express();

// Configure middleware: morgan logger, URL-encoded & JSON body parser
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// *** Routes
app.use(routes);

// Send all other requests to React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Set MongoDB name to Heroku mLab URI (deployed) or mongoHeadlines (localhost)
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/nytgbooks";

// Set up mongoose to use built in ES6 promises and connect to MongoDB
mongoose.Promise = Promise;
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

// *** Start server and listen for requests
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
