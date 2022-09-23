const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const indexController = require("../controllers/indexController");

// Login/Landing page
// GET /
router.get("/", ensureGuest, indexController.loginPage);

// Dashboard
// GET /dashboard
router.get("/dashboard", ensureAuth, indexController.dashboardPage);

module.exports = router;
