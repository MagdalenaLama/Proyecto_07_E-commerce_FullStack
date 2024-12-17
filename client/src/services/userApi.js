import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://proyecto-06-aplicacion-backend-con.onrender.com";

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.user.role;
  }
  return null;
};

export const getUsers = async () => {
  try {
    const { data } = await apiClient.get("/users");
    console.log({ data });
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const registerUser = async (userData) => {
  try {
    const { data } = await apiClient.post("/users/register", userData);
    return data; // Devuelve el id y token
  } catch (error) {
    if (error.response && error.response.data) {
      // Captura el mensaje devuelto por el backend
      throw new Error(error.response.data.message);
    }
    // En caso de que no haya una respuesta del backend
    throw new Error(`No pudimos registrar al usuario. ${error.message}`);
  }
};

/**
 * Esta función recibe unas credenciales como objeto y me retorna un token desde el llamado a la API de autenticación
 * @param {object} credentials
 * @returns {string} - Retorna el Token
 */

export const authenticate = async (credentials) => {
  try {
    const { data } = await apiClient.post("/users/login", credentials);
    console.log(data);
    return data; // Devuelve sólo el token
  } catch (error) {
    if (error.response && error.response.data) {
      // Captura el mensaje devuelto por el backend
      throw new Error(error.response.data.msg);
    }
    // En caso de que no haya una respuesta del backend
    throw new Error(`No pudimos registrar al usuario. ${error.msg}`);
  }
};
