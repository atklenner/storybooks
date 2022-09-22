require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helpers = require("./helpers/helpers");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const storiesRouter = require("./routes/stories");

// Passport
require("./config/passport")(passport);

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

// Static folder
app.use(express.static("public"));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add EJS Helper functions
helpers(app);

// Set EJS as view engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Express session
app.use(
  session({
    secret: "really good secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/stories", storiesRouter);

// Start sever
app.listen(process.env.PORT, () => {
  console.log(
    `It's runnin' in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
