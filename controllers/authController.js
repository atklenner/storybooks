const passport = require("passport");

module.exports = {
  logout: (req, res) => {
    req.logout((error) => {
      if (error) return next(error);
      res.redirect("/");
    });
  },
};
