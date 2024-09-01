import { Request, Response } from "express";
import User from "../model/userSchema";
import Post from "../model/postModel";
import { IUser } from "../types/user";
import Comment from "../model/commentModel";
import fs from "fs";
import path from "path";
interface CustomUser extends Request {
  user: IUser;
}

// Create a new post
export const createPost = async (req: any, res: Response) => {
  const { content } = req.body;
  const userId = req.user._id;
  try {
    const imageUrl = req.file ? req.file.path : null;

    const post = await Post.create({ content, image: imageUrl, user: userId });
    await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Like or unlike a post
export const likePost = async (req: any, res: Response) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId)
      .populate({
        path: "likes",
        select: "userName",
      })
      .populate("user", "userName displayPhoto");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyLiked = post.likes.some(
      (like) => like._id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like._id.toString() !== userId.toString()
      );
      user.likedPosts = user.likedPosts.filter(
        (id) => id.toString() !== postId
      );
    } else {
      post.likes.push(userId);
      user.likedPosts.push(postId);
    }

    await post.save();
    await user.save();

    const updatedPost = await Post.findById(postId)
      .populate({
        path: "likes",
        select: "userName",
      })
      .populate("user", "userName displayPhoto");

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a post
export const deletePost = async (req: any, res: Response) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized you can't delete this post" });
    }

    await Post.deleteOne({ _id: postId });

    await User.findByIdAndUpdate(userId, { $pull: { posts: post._id } });

    await User.updateMany(
      { $or: [{ likedPosts: post._id }, { savedPosts: post._id }] },
      { $pull: { likedPosts: post._id, savedPosts: post._id } }
    );

    await Comment.deleteMany({ post: postId });

    if (post.image) {
      const imagePath = path.join(__dirname, "../../", post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.error(`Image file not found at path: ${imagePath}`);
      }
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "userName displayPhoto",
        },
      })
      .populate("user", "userName displayPhoto")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

// Get Posts by User
export const getUserPosts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ user: userId })
      .populate("user", "userName displayPhoto")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(200).json({ message: "Failed to fetch user posts", error });
  }
};

export const savePost = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { postId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.savedPosts.includes(postId)) {
      return res.status(400).json({ message: "Post already saved" });
    }

    user.savedPosts.push(postId);
    await user.save();

    res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save post", error });
  }
};

// get liked posts
export const getLikedPosts = async (req: any, res: Response) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate("likedPosts");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.likedPosts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch liked posts", error });
  }
};

// get saved posts
export const getSavedPosts = async (req: any, res: Response) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate("savedPosts");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch saved posts", error });
  }
};

export const editPost = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const { content } = req.body;
  const image = req.file;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this post" });
    }

    if (image) {
      if (post.image) {
        const oldImagePath = path.join(__dirname, "../../", post.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        } else {
          console.error(`Old image not found at path: ${oldImagePath}`);
        }
      }

      post.image = `uploads\\${image.filename}`;
    }

    post.content = content || post.content;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error });
  }
};
