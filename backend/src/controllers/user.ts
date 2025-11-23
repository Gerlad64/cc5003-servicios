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
      
      // Validar que todos los campos requeridos estén presentes
      if (!username || !password || !name || !last_name) {
          return res.status(400).json({ 
              error: "Todos los campos son requeridos" 
          });
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ 
              error: "El nombre de usuario ya está en uso" 
          });
      }

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
  } catch (error: any) {
      // Manejar errores de validación de Mongoose
      if (error.name === 'ValidationError') {
          return res.status(400).json({ 
              error: "Error de validación: " + error.message 
          });
      }
      // Manejar errores de duplicado (código 11000)
      if (error.code === 11000) {
          return res.status(400).json({ 
              error: "El nombre de usuario ya está en uso" 
          });
      }
      next(error);
  }
};

export default { createOne, getAll, getById };

