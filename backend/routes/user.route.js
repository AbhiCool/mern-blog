const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile", isAuthenticated, userController.profile);

router.get("/logout", userController.logout);
module.exports = router;
