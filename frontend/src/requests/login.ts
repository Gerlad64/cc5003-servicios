import axios from "axios";
// import axiosSecure from "../utils/axiosSecure";

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

export default {
  login,
}