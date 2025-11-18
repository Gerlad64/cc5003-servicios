import axios from "axios";
import type { UserData } from "../model/UserData";

const baseUrl = "http://localhost:3001/users";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((req) => req.data);
}

const getFiltered = (filter: (u: UserData) => boolean) => {
    const request = axios.get(baseUrl);
    return request.then((req) => {
        const data = req.data as UserData[];
        return data.filter(filter);
    });
};

const getbyId = (id: number | number[]) => {
    if (Array.isArray(id)) {
        // Si es un array, usar filtro para múltiples IDs
        const filter = (u: UserData) => id.includes(u.id);
        return getFiltered(filter);
    } else {
        // Si es un solo ID, usar el endpoint específico de json-server
        const request = axios.get(`${baseUrl}/${id}`);
        return request.then((req) => [req.data as UserData]);
    }
};

export default {
    getAll,
    getFiltered,
    getbyId,
};