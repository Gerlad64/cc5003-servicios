/**
 * Interface que representa un usuario de la aplicación, 
 * ya sea prestador de algún servicio o no.
 * Tiene toda la información relevante para que una vista pueda
 * mostrar o usar la información acerca del usuario.
 */
export interface UserData {
    /** identificador único de usuario */
    id: number;
    /** nombre del usuario */
    name: string;
    /** apellido del usuario */
    last_name: string;
    /** id's de los servicios que ofrece */
    services: number[];
    /** url a foto de perfil */
    profile_pic?: string;
    /** la "biografía" del usuario */
    biography?: string;
    /** la calificación total por todos sus servicios */
    rating: number;
};