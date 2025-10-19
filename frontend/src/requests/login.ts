import axios from "axios";
import axiosSecure from "../utils/axiosSecure";

type Credentials = {
  username: string;
  password: string;
};

const baseUrl = "http://localhost:3001/api/login";

const login = async (credenttials: Credentials) => {
  const response = await axios.post(baseUrl, credenttials);

  const csrfToken = response.headers["x-csrf-token"];

  if (csrfToken) {
    localStorage.setItem("csrfToken", csrfToken);
  }

  return response.data
};

const restoreLogin = async () => {
  try {
    const response = await axiosSecure.get(baseUrl + "/me");
    return response.data;
  } catch {
    return null;
  }
};

const logout = async () => {
  await axios.post(baseUrl + "/logout");
  localStorage.removeItem("csrfToken");
};

export default {
  login,
  logout,
  restoreLogin,
}