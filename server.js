require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.DB_STRING, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("connected to DB");
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.listen(process.env.PORT, () => {
  console.log(
    `It's runnin' in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
