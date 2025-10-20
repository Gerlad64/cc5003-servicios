import axios from "axios";
import type { ServiceData } from "../model/ServiceData";
import axiosSecure from "../utils/axiosSecure";

const baseUrl = "http://localhost:3001/api/services";

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

const getbyId = (id: string | string[]) => {
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

const createService  = (newService: Omit<ServiceData, "id">) => {
    const request = axiosSecure.post(baseUrl, newService);
    return request.then((req) => req.data as ServiceData );
}

const create = async (serviceData: any) => {
  const response = await axios.post(baseUrl, serviceData);
  return response.data;
};

export default {
    getAll,
    getFiltered,
    getbyId,
    createService,
    create,
};