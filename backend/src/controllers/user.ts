import { Request, Response, NextFunction } from "express";
import User from "../models/user";


const getById = async (req: Request, res: Response ) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return res.status(404).end();
    return res.json(user);
};

export default { getById };