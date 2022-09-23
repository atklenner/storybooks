const Story = require("../models/Story");

module.exports = {
  loginPage: (req, res) => {
    res.render("login", { layout: "./layouts/login" });
  },
  dashboardPage: async (req, res) => {
    try {
      const stories = await Story.find({ user: req.user._id }).lean();
      res.render("dashboard", { name: req.user.firstName, stories });
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
};
