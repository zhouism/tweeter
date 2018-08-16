"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {MongoClient} = require('mongodb');
const mongodb_URI = 'mongodb://127.0.0.1:27017/tweeter';

MongoClient.connect(mongodb_URI, (err, db) => {
  
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }


const DataHelpers = require("./lib/data-helpers.js")(db);
const tweetsRoutes = require("./routes/tweets")(DataHelpers);
app.use("/tweets", tweetsRoutes);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
