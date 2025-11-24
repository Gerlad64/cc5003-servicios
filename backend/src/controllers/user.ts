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

const updateProfilePic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Verificar si multer procesó el archivo
        if (!req.file) {
            return res.status(400).json({ message: 'No se subió ningún archivo' });
        }
        const userId = req.params.id;
        // ruta para guardar archivo
        const filePath = `/profile_pics/${req.file.filename}`;

        // actualizar
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profile_pic: filePath },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.json({
            message: 'Foto actualizada',
            url: updatedUser.profile_pic_url
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al subir imagen', error });
    }
}

export default { createOne, getAll, getById, updateInfo, updateProfilePic };

