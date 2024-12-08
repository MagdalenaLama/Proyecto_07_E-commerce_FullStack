import axios from "axios";

const URL_BASE = "https://proyecto-06-aplicacion-backend-con.onrender.com";

const apiProductsClients = axios.create({
  baseURL: URL_BASE,
});

export const getAllProducts = async () => {
  try {
    const { data } = await apiProductsClients.get("/products");
    return data;
  } catch (error) {
    console.error(error);
  }
};
