import mongoose from "mongoose";

export interface IComment extends Document {
  text: string;
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  remove: any;
}
