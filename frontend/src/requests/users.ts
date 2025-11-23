import axios from "axios";
import type { UserData } from "../model/UserData";

const baseUrl = "/api/users";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((req) => req.data as UserData[]);
}

const getFiltered = (filter: (u: UserData) => boolean) => {
    const request = axios.get(baseUrl);
    return request.then((req) => {
        const data = req.data as UserData[];
        return data.filter(filter);
    });
};

const getbyId = (id: string | string[]) => {
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

const createUser = (newUser : {username: string, password: string, name: string, last_name: string}) => {
    return axios.post(baseUrl, newUser).then((request) => request.data);
};

export default {
    getAll,
    getFiltered,
    getbyId,
    createUser,
};