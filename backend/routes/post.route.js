const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

const uploadMiddleware = require("../config/multerSetup");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post(
  "/post",
  isAuthenticated,
  uploadMiddleware.single("image"),
  postController.createPost
);

router.get("/post", postController.getPosts);

router.get("/post/:id", postController.getPostDetail);

router.put(
  "/post/:id",
  uploadMiddleware.single("image"),
  postController.updatePost
);

module.exports = router;
