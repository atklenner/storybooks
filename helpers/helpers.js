const { truncate, stripTags } = require("./ejs");

module.exports = (app) => {
  app.locals.truncate = truncate;
  app.locals.stripTags = stripTags;
};
