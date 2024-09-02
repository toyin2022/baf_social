import { Request, Response } from "express";
import User from "../../model/userSchema";
import Otp from "../../model/otpModel";
import { sendOTP } from "../../utils/emailService";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const Register = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      userName,
      email,
      password,
    });

    const otp = generateOTP();
    const otpDoc = await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    sendOTP(email, otp);

    res.status(201).json({
      message:
        "User registered. Check your email to verify your account with OTP.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Error creating an account", error });
  }
};
