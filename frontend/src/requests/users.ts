import axios from "axios"
import type { UserData } from "../model/UserData";

const baseUrl = "/..."


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
    const ids = Array.isArray(id) ? id : [id];
    const filter = (u: UserData) => ids.includes(u.id);
    return getFiltered(filter);
};

export default {
    getAll,
    getFiltered,
    getbyId,
}