import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../context/Cart/cartContext.js";

const { cart } = useContext(CartContext);
const API_URL = "https://proyecto-06-aplicacion-backend-con.onrender.com";

export const apiClient = axios.create({
  baseURL: API_URL,
});

console.log(cart);
