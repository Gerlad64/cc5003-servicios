import mongoose, { Schema, Document } from "mongoose"
import {Service} from "json-server/lib/service";


mongoose.set("strictQuery", false);

/**
 * Interface que representa un usuario de la aplicación,
 * ya sea prestador de algún servicio o no.
 * Tiene toda la información relevante para que una vista pueda
 * mostrar o usar la información acerca del usuario.
 */
interface UserData {
    /** username para login */
    username: string;
    /** contraseña hasheada */
    password: string;
    createdAt: Date;
    updatedAt: Date;
    /** nombre del usuario */
    name: string;
    /** apellido del usuario */
    last_name: string;
    /** id's de los servicios que ofrece */
    services: mongoose.Types.ObjectId[];
    /** ruta a la foto de perfil en el backend. Ejemplo: /profile_pics/foto.jpg */
    profile_pic?: string;
    /** url a la foto de perfil. Ejemplo: http://HOST:PORT*/
    profile_pic_url?: string;
    /** la "biografía" del usuario */
    biography?: string;
    /** la calificación total por todos sus servicios */
    rating: number;
}

const userSchema = new Schema<UserData>({
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
    },
    password: String,
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    last_name: {
        type: String,
        required: true,
        minlength: 1,
    },
    services: {
        type: [Schema.Types.ObjectId],
        ref: "Service",
        default: [],
    },
    profile_pic: {
        type: String,
        required: false,
    },
    biography: {
        type: String,
        required: false,
        maxlength: 500,
    },
    rating: {
        type: Number,
        required: true,
        default: 0.0,
        min: 0.0,
        max: 5.0
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true
});

/** Permite retornar la url a la foto de perfil, independientemente de
 * la url que esté hosteando el backend, ya sea localhost o fullstack.dcc.uchile.cl*/
userSchema.virtual("profile_pic_url").get(function () {
    if (!this.profile_pic) {
        return null;
    }
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

    return `${baseUrl}${this.profile_pic}`;
})

const User = mongoose.model<UserData>("User", userSchema);

userSchema.set("toJSON", {
    transform: (
        _,
        returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
    ) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default User