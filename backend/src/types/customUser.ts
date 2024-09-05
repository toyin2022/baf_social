import { Request } from "express";
import { IUser } from "./user";

export interface CustomUser extends Request {
  user?: IUser;
}
