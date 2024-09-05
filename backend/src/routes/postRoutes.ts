import { Router } from "express";

import { authMiddleware } from "../middleware/auth";
import {
  createPost,
  deletePost,
  likePost,
  getAllPosts,
  getUserPosts,
  savePost,
  getLikedPosts,
  getSavedPosts,
  editPost,
} from "../controller/postController";
import upload from "../multerConfig";
import multer from "multer";

const router = Router();

// Add a new post
router.post("/add", authMiddleware, upload.single("image"), createPost);

// Delete a post
router.delete("/delete/:postId", authMiddleware, deletePost);

// Like a post
router.put("/like/:postId", authMiddleware, likePost);

// Get all posts
router.get("/all", getAllPosts);

// Get a user's posts
router.get("/user/:userId", getUserPosts);

router.post("/save/:postId", authMiddleware, savePost);

router.get("/liked", authMiddleware, getLikedPosts);
router.get("/saved", authMiddleware, getSavedPosts);
router.put("/edit/:postId", authMiddleware, upload.single("image"), editPost);

router.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({ message: "File size is too large." });
      case "LIMIT_UNEXPECTED_FILE":
        return res.status(400).json({
          message:
            "Unexpected field or invalid file type or more than one file uploaded.",
        });
      default:
        return res.status(400).json({ message: err.message });
    }
  } else if (err) {
    return res
      .status(500)
      .json({ message: "An error occurred.", error: err.message });
  }
  next();
});
export default router;
