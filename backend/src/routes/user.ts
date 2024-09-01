import { Router } from "express";
import { Login } from "../controller/auth/login";
import { Register } from "../controller/auth/register";
import { Logout } from "../controller/auth/logout";
import { verifyOtp } from "../controller/auth/verifyOtp";
import {
  updateBio,
  updateCoverPhoto,
  updateDisplayPhoto,
} from "../controller/userController";
import { uploadCoverPhoto, uploadDisplayPhoto } from "../photoUploadConfig";
import { authMiddleware } from "../middleware/auth";
import multer from "multer";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/verify-otp", verifyOtp);
router.post("/logout", Logout);

router.put("/user/:userId/bio", authMiddleware, updateBio);
router.put(
  "/user/:userId/cover-photo",
  authMiddleware,
  uploadCoverPhoto.single("coverPhoto"),
  updateCoverPhoto
);
router.put(
  "/user/:userId/display-photo",
  authMiddleware,
  uploadDisplayPhoto.single("displayPhoto"),
  updateDisplayPhoto
);

router.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({ message: "File size is too large." });
      case "LIMIT_UNEXPECTED_FILE":
        return res.status(400).json({
          message:
            "Unexpected field or invalid file type or more than one image was selected.",
        });
      default:
        return res.status(400).json({ message: err.message });
    }
  } else if (err) {
    // Other errors
    return res
      .status(500)
      .json({ message: "An error occurred.", error: err.message });
  }
  next();
});

export default router;
