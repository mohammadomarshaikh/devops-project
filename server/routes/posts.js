const express = require("express");
const router = express.Router();
const { Post, validatePost } = require("../models/post");
const { Tag } = require("../models/tag");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    let all_posts = await Post.find().populate("author", "name -_id");
    res.send(all_posts);
  } catch (error) {
    res.status(500).send("Error fetching posts.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name username"
    );
    if (!post) return res.status(404).send("Post not found.");
    
    // Increment views count
    post.views += 1;
    await post.save();

    res.send(post);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.post("/create", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  // Check if tags are provided, if not, initialize an empty array
  const tags = req.body.tags || [];

  const tags_array = [];
  for (let i = 0; i < tags.length; i++) {
    const tag_in_db = await Tag.findById(tags[i]);
    if (!tag_in_db) return res.status(400).send("Invalid Tag");
    tags_array.push(tag_in_db);
  }

  const post = new Post({
    title: req.body.title,
    tags: tags_array,
    description: req.body.description,
    author: req.user._id,
    views: 1,
  });
  try {
    await post.save();
    res.send("Post successfully created.");
  } catch (err) {
    console.log("error: ", err);
    res.status(500).send("Error creating post.");
  }
});

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send("Post doesn't exist.");
    if (post.author.equals(req.user._id))
      return res.status(400).send("You can't upvote your own post.");
    const index = post.upvotes.indexOf(req.user._id);
    if (index === -1) {
      post.upvotes.push(req.user._id);
    } else {
      post.upvotes.splice(index, 1);
    }
    await post.save();
    res.send(post);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found.");

    // Check if the current user is the author of the post
    if (!post.author.equals(req.user._id)) {
      return res.status(403).send("You are not authorized to delete this post.");
    }

    await post.remove();
    res.send("Post deleted successfully.");
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

module.exports = router;
