import axios from "axios";
import type { UserData } from "../model/UserData";
const baseUrl = "http://localhost:3001/users";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newService: Omit<UserData, "id">) => {
  return axios.post(baseUrl, newService).then((response) => response.data);
};

export default { getAll, create };