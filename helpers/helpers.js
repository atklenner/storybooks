const { formatDate, truncate, stripTags, editIcon } = require("./ejs");

module.exports = (app) => {
  app.locals.formatDate = formatDate;
  app.locals.truncate = truncate;
  app.locals.stripTags = stripTags;
  app.locals.editIcon = editIcon;
};
