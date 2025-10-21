import mongoose, { Schema } from "mongoose";


mongoose.set("strictQuery", false);


/**
 * Interface que representa la reseña hacia un servicio,
 * creada por un usuario con cuenta registrada.
 */
export interface ReviewData {
    /** id del servicio al que se está creando una reseña */
    service_id: mongoose.Types.ObjectId;
    /** id del usuario autor de la reseña*/
    user_id: mongoose.Types.ObjectId;
    /** rating proporcionado */
    rating: number; // e.g., 1 to 5
    /** comentario opcional de la reseña */
    comment?: string;
    /** fecha de creación*/
    created_at: Date; // ISO date string
}

const reviewSchema = new Schema<ReviewData>({
    service_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Service",
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    rating: {
        type: Number,
        required: true,
        min: 1.0,
        max: 5.0
    },
    comment: {
        type: String,
        required: false,
        maxlength: 500,
    }
}, { timestamps: true });

const Review = mongoose.model<ReviewData>("Review", reviewSchema);

export default Review;