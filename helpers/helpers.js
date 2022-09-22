const { truncate, stripTags, editIcon } = require("./ejs");

module.exports = (app) => {
  app.locals.truncate = truncate;
  app.locals.stripTags = stripTags;
  app.locals.editIcon = editIcon;
};
