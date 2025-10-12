import mongoose from "mongoose"
import {Service} from "json-server/lib/service";


mongoose.set("strictQuery", false);

/**
 * Interface que representa un usuario de la aplicación,
 * ya sea prestador de algún servicio o no.
 * Tiene toda la información relevante para que una vista pueda
 * mostrar o usar la información acerca del usuario.
 */
interface UserData {
    /** nombre del usuario */
    name: string;
    /** apellido del usuario */
    last_name: string;
    /** id's de los servicios que ofrece */
    services: mongoose.Types.ObjectId[];
    /** url a foto de perfil */
    profile_pic?: string;
    /** la "biografía" del usuario */
    biography?: string;
    /** la calificación total por todos sus servicios */
    rating: number;
}

const userSchema = new mongoose.Schema<UserData>({
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Service",
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
});

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