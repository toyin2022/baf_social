import { Request, Response } from "express";

export const Logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
