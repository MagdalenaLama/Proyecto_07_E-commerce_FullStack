import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Home, Cart, Login, Register, Products, Admin } from "../pages/index";
import { PrivateRoute } from "./PrivateRoute";
import { Footer } from "../components/Footer";

export const AppRouter = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};
