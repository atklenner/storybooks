const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

// Auth with Google
// GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google auth callback
// GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/dashboard")
);

// Logout user
// GET /auth/logout
router.get("/logout", authController.logout);

module.exports = router;
