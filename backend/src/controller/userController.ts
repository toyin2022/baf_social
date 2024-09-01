import { Request, Response } from "express";
import User from "../model/userSchema";

// Update User Bio
export const updateBio = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { bio } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bio = bio;
    await user.save();
    res
      .status(200)
      .json({ message: "Bio updated successfully", bio: user.bio });
  } catch (error) {
    res.status(500).json({ message: "Failed to update bio", error });
  }
};

// Update User Cover Photo
export const updateCoverPhoto = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const coverPhoto = req.file;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (coverPhoto) {
      user.coverPhoto = `uploads/coverPhotos/${coverPhoto.filename}`;
      await user.save();
      res.status(200).json({
        message: "Cover photo updated successfully",
        coverPhoto: user.coverPhoto,
      });
    } else {
      res.status(400).json({ message: "No cover photo uploaded" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update cover photo", error });
  }
};

// Update User Display Photo
export const updateDisplayPhoto = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const displayPhoto = req.file;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (displayPhoto) {
      user.displayPhoto = `uploads/displayPhotos/${displayPhoto.filename}`;
      await user.save();
      res.status(200).json({
        message: "Display photo updated successfully",
        displayPhoto: user.displayPhoto,
      });
    } else {
      res.status(400).json({ message: "No display photo uploaded" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update display photo", error });
  }
};
