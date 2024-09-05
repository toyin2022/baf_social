import mongoose from "mongoose";

export interface IPost extends Document {
  content: string;
  image?: string;
  user: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
