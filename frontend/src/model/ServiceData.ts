/**
 * Interface que guarda los medios de contacto de un usuario.
 */
export interface Contact {
    whatsapp?: string;
    instagram?: string;
    telegram?: string;
    mail?: string; 
};

/**
 * Interface que representa un servicio prestado por algún usuario.
 * Tiene toda la información relevante para que una vista pueda mostrar
 * el servicio que se ofrece.
 */
export interface ServiceData {
    /** identificador único del servicio */
    id: string;
    /** identificador único del usuario que ofrece el servicio */
    user_id: string;
    /** nombre del servicio que se está prestando */
    name: string;
    /** Calificación del servicio */
    rating: number;
    /** true si el servicio se ofrece a domicilio, false si no. */
    is_delivery: boolean;
    /** alcance del servicio delivery */
    delivery_scope?: string;
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
};