import mongoose, { Document, Schema } from "mongoose";
import { IOtp } from "../types/otp";

const otpSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const Otp = mongoose.model<IOtp>("Otp", otpSchema);
export default Otp;
