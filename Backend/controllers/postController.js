import mongoose from "mongoose";
import { Post } from "../models/postModel.js";
export async function createPost(req, res) {
  try {
    const { title, category, content } = await req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newPost = new Post({
      title,
      category,
      content,
      author: req.user.clerkId || req.user._id 
    });
    await newPost.save();
    console.log("sent the post", newPost);
    res.status(200).json({ message: "Post created successfully", newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await Post.find();
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.clerkId || req.user._id; 
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "User already liked the post" });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
