import mongoose, { Document, Schema, Model } from "mongoose";
import { IPost } from "../types/post";

const postSchema: Schema<IPost> = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);
export default Post;
