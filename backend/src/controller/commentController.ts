import { Request, Response } from "express";
import Comment from "../model/commentModel";
import Post from "../model/postModel";

export const addComment = async (req: any, res: any) => {
  const { postId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  try {
    const comment = await Comment.create({ text, user: userId, post: postId });

    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a comment
export const deleteComment = async (req: any, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized you cant delete this comment" });
    }

    await comment.deleteOne({ _id: commentId });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const editComment = async (req: any, res: Response) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized you cant edit this comment" });
    }

    comment.text = text;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
