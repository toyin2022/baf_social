import { Request, Response } from "express";
import Otp from "../../model/otpModel";
import User from "../../model/userSchema";

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(200).json({ message: "Invalid or expired OTP" });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(200).json({ message: "OTP has expired" });
    }

    // Activate user after successful OTP verification
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    // Delete OTP record after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
