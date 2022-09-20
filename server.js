require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

// Load database
mongoose.connect(process.env.DB_STRING, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("connected to DB");
});

// Add logging to development server
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

// Set EJS as view engine
app.set("view engine", "ejs");

// Start sever
app.listen(process.env.PORT, () => {
  console.log(
    `It's runnin' in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
