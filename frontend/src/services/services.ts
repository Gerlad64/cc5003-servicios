import axios from "axios";
import type { ServiceData } from "../model/ServiceData";
const baseUrl = "http://localhost:3001/services";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newService: Omit<ServiceData, "id">) => {
  return axios.post(baseUrl, newService).then((response) => response.data);
};

export default { getAll, create };