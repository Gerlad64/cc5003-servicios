import axios from "axios";
import type { ReviewData } from "../model/ReviewData";

const baseUrl = "http://localhost:3001/api/reviews";

/**
 * Obtiene todas las reviews de un servicio específico
 * @param serviceId - ID del servicio
 * @returns Array de reviews del servicio
 */
const getByServiceId = async (serviceId: string): Promise<ReviewData[]> => {
  try {
    const response = await axios.get(`${baseUrl}/service/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Por ahora retornamos un array vacío si hay error
    // Esto es temporal hasta que se implemente el endpoint en el backend
    return [];
  }
};

/**
 * Crea una nueva review para un servicio
 * @param reviewData - Datos de la review a crear
 * @returns La review creada
 */
const create = async (reviewData: Omit<ReviewData, "id" | "created_at">): Promise<ReviewData> => {
  const response = await axios.post(baseUrl, reviewData);
  return response.data;
};

/**
 * Obtiene todas las reviews (para uso administrativo)
 * @returns Array con todas las reviews
 */
const getAll = async (): Promise<ReviewData[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

/**
 * Elimina una review por su ID
 * @param id - ID de la review a eliminar
 */
const remove = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
};

export default {
  getByServiceId,
  create,
  getAll,
  remove,
};
