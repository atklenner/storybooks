const Story = require("../models/Story");

module.exports = {
  addStoryPage: (req, res) => {
    res.render("stories/add");
  },
  showAllStories: async (req, res) => {
    try {
      const stories = await Story.find({ status: "public" })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();
      res.render("stories/index", { stories, userId: req.user._id });
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
  showUserStories: async (req, res) => {
    try {
      const stories = await Story.find({
        user: req.params.userId,
        status: "public",
      })
        .populate("user")
        .lean();
      res.render("stories/index", { stories, userId: req.user._id });
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
  showSingleStory: async (req, res) => {
    try {
      let story = await Story.findById(req.params.id).populate("user").lean();

      if (!story) {
        return res.render("error/404");
      }

      res.render("stories/show", { story, userId: req.user._id });
    } catch (error) {
      console.error(error);
      res.render("error/404");
    }
  },
  addStory: async (req, res) => {
    try {
      req.body.user = req.user.id;
      await Story.create(req.body);
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
  editStoryPage: async (req, res) => {
    try {
      const story = await Story.findOne({ _id: req.params.id }).lean();

      if (!story) {
        return res.render("error/404");
      }

      if (story.user != req.user.id) {
        res.redirect("/stories");
      } else {
        res.render("stories/edit", { story });
      }
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
  editStory: async (req, res) => {
    try {
      const story = await Story.findById(req.params.id).lean();

      if (!story) {
        return res.render("error/404");
      }

      if (story.user.toString() != req.user._id.toString()) {
        res.redirect("/stories");
      } else {
        await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        });
        res.redirect("/dashboard");
      }
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
  deleteStory: async (req, res) => {
    try {
      await Story.findByIdAndRemove(req.params.id);
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
};
