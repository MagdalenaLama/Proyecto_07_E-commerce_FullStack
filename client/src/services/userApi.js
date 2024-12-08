import axios from "axios";

const API_URL = "https://proyecto-06-aplicacion-backend-con.onrender.com";

export const apiClient = axios.create({
  baseURL: API_URL,
});

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