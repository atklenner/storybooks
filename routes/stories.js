const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");
const storiesController = require("../controllers/storiesController");

// Show add page
// GET /stories/add
router.get("/add", ensureAuth, storiesController.addStoryPage);

// Show all stories
// GET /stories
router.get("/", ensureAuth, storiesController.showAllStories);

// Show single story
// GET /stories/:id
router.get("/:id", storiesController.showSingleStory);

// Process add form
// POST /stories
router.post("/", ensureAuth, storiesController.addStory);

// Show edit page
// GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, storiesController.editStoryPage);

// Update story
// PUT /stories/:id
router.put("/:id", ensureAuth, storiesController.editStory);

// Delete story
// DELETE /stories/:id
router.delete("/:id", ensureAuth, storiesController.deleteStory);

// Show user stories
// GET /stories/user/:userId
router.get("/user/:userId", ensureAuth, storiesController.showUserStories);

module.exports = router;
