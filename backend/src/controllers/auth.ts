import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import config from "../utils/config";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /** Obtener parametros de la request */
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        /** Chequear si es un login válido */
        const invalidLogin =  user ? !await bcrypt.compare(password, user.password) : false;
        if( invalidLogin  || !user) // 2do para que el compilador no reclame que user puede ser null
            return res.status(401).json({error: "invalid username or password"});

        /** Crear token con medidas de seguridad */
        const userForToken = {
            username: username,
            csrf: crypto.randomUUID(),
            id: user._id,
        }
        const token = jwt.sign(userForToken, config.JWT_SECRET, {expiresIn: 60 * 60 });
        res.setHeader("X-CSRF-TOKEN", userForToken.csrf);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        /** ----DONE----*/
        res.status(200).send({ username: user.username });
    } catch (error) {
        next(error);
    }
};

const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).send({
        message: "Logged out successfully",
    });
};

export const me = async (req: Request, res: Response) => {
    // const body = req.body;
    const user = await User.findById(req.userId);
    res.status(200).json(user);
};

export default { login, logout, me };