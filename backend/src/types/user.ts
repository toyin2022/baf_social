import mongoose from "mongoose";

// Define an interface representing a document in MongoDB
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  bio?: string;
  coverPhoto?: string;
  displayPhoto?: string;
  joinDate: Date;
  posts: mongoose.Types.ObjectId[];
  likedPosts: mongoose.Types.ObjectId[];
  savedPosts: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  isModified: any;
}
