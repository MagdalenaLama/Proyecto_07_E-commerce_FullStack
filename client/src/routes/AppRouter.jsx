import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Home, Cart, Login, Register, Products, Admin } from "../pages/index";

export const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};
