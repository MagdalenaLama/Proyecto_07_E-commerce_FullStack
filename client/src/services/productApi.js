import axios from "axios";

const URL_BASE = "https://proyecto-06-aplicacion-backend-con.onrender.com";

const apiProductsClients = axios.create({
  baseURL: URL_BASE,
});

apiProductsClients.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAllProducts = async () => {
  try {
    const { data } = await apiProductsClients.get("/products");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const { data } = await apiProductsClients.put(
      `/products/${id}`,
      updatedProduct
    );
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const { data } = await apiProductsClients.post("/products", productData);
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await apiProductsClients.delete(`/products/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
