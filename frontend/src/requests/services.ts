import axios from "axios"
import type { ServiceData } from "../model/ServiceData";

const baseUrl = "/..."


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
    const ids = Array.isArray(id) ? id : [id];
    const filter = (s: ServiceData) => ids.includes(s.id);
    return getFiltered(filter);
};

export default {
    getAll,
    getFiltered,
    getbyId,    
}