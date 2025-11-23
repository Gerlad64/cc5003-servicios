import mongoose from "mongoose";


mongoose.set("strictQuery", false);

/**
 * Interface que guarda los medios de contacto de un usuario.
 */
interface Contact {
    whatsapp?: string;
    instagram?: string;
    telegram?: string;
    mail?: string;
}

/**
 * Interface que representa un servicio prestado por algún usuario.
 * Tiene toda la información relevante para que una vista pueda mostrar
 * el servicio que se ofrece.
 */
interface ServiceData {
    /** identificador único del usuario que ofrece el servicio */
    user_id: mongoose.Types.ObjectId;
    /** nombre del servicio que se está prestando */
    name: string;
    /** categoría del servicio */
    category: string;
    /** Calificación del servicio */
    rating: number;
    /** true si el servicio se ofrece a domicilio, false si no. */
    is_delivery: boolean;
    /** alcance del servicio delivery */
    delivery_scope?: string[];
    /** true si el servicio se ofrece en un lugar en particular  */
    on_location: boolean;
    /** lugar donde se ofrece el servicio */
    location?: string;
    /** horario en el que se ofrece el servicio */
    schedule: string;
    /** descripción del servicio */
    description: string;
    /** cómo se cobrará el servicio */
    pricing: string;
    /** objeto Contact con medios para contactar al prestador de servicio */
    contact: Contact;
}

const contactSchema = new mongoose.Schema<Contact>({
    whatsapp: { type: String, required: false },
    instagram: { type: String, required: false },
    telegram: { type: String, required: false },
    mail: { type: String, required: false },
})

const serviceSchema = new mongoose.Schema<ServiceData>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
        default: 0.0,
        min: 0.0,
        max: 5.0,
    },
    on_location: Boolean,
    is_delivery: Boolean,
    delivery_scope: [String],
    location: String,
    schedule: String,
    description: String,
    pricing: String,
    contact: contactSchema,
});

const Service = mongoose.model<ServiceData>("Service", serviceSchema);

serviceSchema.set("toJSON", {
    transform: (
        _,
        returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
    ) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default Service;