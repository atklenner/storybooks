require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

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
app.use(expressLayouts);
app.set("layout", "./layouts/index");
app.set("view engine", "ejs");

// Set routes
app.use("/", indexRouter);

// Start sever
app.listen(process.env.PORT, () => {
  console.log(
    `It's runnin' in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
