import axios from "axios"
import type { ServiceData } from "../model/ServiceData";

const baseUrl = "http://localhost:3001/services"


/**
 * trae del servidor todos los servicios
 */
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((req) => req.data as ServiceData[]);
};

const getFiltered = (filter: (u: ServiceData) => boolean) => {
    const request = axios.get(baseUrl);
    return request.then((req) => {
        const data = req.data as ServiceData[];
        return data.filter(filter);
    });
};

const getbyId = (id: number | number[]) => {
    if (Array.isArray(id)) {
        // Si es un array, usar filtro para múltiples IDs
        const filter = (s: ServiceData) => id.includes(s.id);
        return getFiltered(filter);
    } else {
        // Si es un solo ID, usar el endpoint específico de json-server
        const request = axios.get(`${baseUrl}/${id}`);
        return request.then((req) => [req.data as ServiceData]);
    }
};

export default {
    getAll,
    getFiltered,
    getbyId,    
}