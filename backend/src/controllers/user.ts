import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";


const getAll = async (req: Request, res: Response) => {
    const users = await User.find({});
    res.json(users);
}

const getById = async (req: Request, res: Response ) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return res.status(404).end();
    return res.json(user);
};

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const {username, password, name, last_name} = req.body;
      const saltRounds = 10;
      const hashed = await bcrypt.hash(password, saltRounds);

      const user = new User({
          username: username,
          password: hashed,
          name: name,
          last_name: last_name,
      })
      const savedUser = await user.save();

      res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export default { createOne, getAll, getById };

