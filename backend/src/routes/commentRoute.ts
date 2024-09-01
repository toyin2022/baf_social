import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  addComment,
  deleteComment,
  editComment,
} from "../controller/commentController";
const router = Router();

router.post("/comments/:postId", authMiddleware, addComment);
router.delete("/comments/:commentId", authMiddleware, deleteComment);
router.put("/comments/:commentId", authMiddleware, editComment);

export default router;
