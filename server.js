require("dotenv").config();
const express = require("express");
const app = express();

app.listen(process.env.PORT, () => {
  console.log(
    `It's runnin' in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
