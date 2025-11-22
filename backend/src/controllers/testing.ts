import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import Review from "../models/review";
import Service from "../models/service";

const reset = async (req: Request, res: Response) => {
  await User.deleteMany({});
  await Review.deleteMany({});
  await Service.deleteMany({});

  res.status(204).end();
};

export default { reset };