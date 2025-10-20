import axios from "axios";
import type { ReviewData } from "../model/ReviewData";

const baseUrl = "http://localhost:3001/api/reviews";

const getByServiceId = async (serviceId: string): Promise<ReviewData[]> => {
  const response = await axios.get(`${baseUrl}/service/${serviceId}`);
  return response.data;
};

const create = async (reviewData: Omit<ReviewData, "id" | "created_at">) => {
  const response = await axios.post(baseUrl, reviewData);
  return response.data;
};

export default { getByServiceId, create };