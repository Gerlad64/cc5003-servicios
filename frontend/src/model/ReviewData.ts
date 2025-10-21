/**
 * Interface que representa la reseña hacia un servicio,
 * creada por un usuario con cuenta registrada.
 */
export interface ReviewData {
    /** id de la reseña */
    id: string;
    /** id del servicio al que se está creando una reseña */
    service_id: string;
    /** id del usuario autor de la reseña*/
    user_id: string;
    /** rating proporcionado */
    rating: number; // e.g., 1 to 5
    /** comentario opcional de la reseña */
    comment?: string;
    /** fecha de creación*/
    createdAt: Date; // ISO date string
}   