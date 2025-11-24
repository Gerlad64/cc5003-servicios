import multer from 'multer';
import path from 'path';
import fs from "fs";

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // ruta donde se guardan las fotos de pefil
        const uploadPath = path.resolve(__dirname, '../../profile_pics');

        // crea la carpeta si no existe
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        // pasar ruta al callback
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // crea nombre unico
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Filtro para validar que solo suban imágenes
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('No es un archivo de imagen!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Límite de 5MB
});

export default upload;