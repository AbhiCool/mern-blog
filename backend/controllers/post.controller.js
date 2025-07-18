const fsp = require("fs/promises");
const postModel = require("../models/post.model");
exports.createPost = async (req, res, next) => {
  try {
    const { title, summary, content } = req.body;

    const finalPath = await uploadFile(req);

    const newPost = await postModel.create({
      title: title,
      summary: summary,
      content: content,
      image: finalPath,
      author: req.user.id,
    });
    res.json({
      image: req.file,
      ext,
      newPost,
      message: "Post created",
    });
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await postModel
      .find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPostDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id).populate("author", "username");
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, summary, content } = req.body;

    const finalData = { title, summary, content };

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const finalPath = await uploadFile(req);
    if (finalPath) {
      finalData.image = finalPath;
    }

    const updPost = await postModel.findByIdAndUpdate(id, finalData, {
      new: true,
    });

    res.json({
      image: req.file,
      post: updPost,
      message: "Post updated",
    });
  } catch (error) {
    next(error);
  }
};
async function uploadFile(req) {
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];

    await fsp.rename(path, `${path}.${ext}`);

    return `${path}.${ext}`;
  }
  return null;
}
