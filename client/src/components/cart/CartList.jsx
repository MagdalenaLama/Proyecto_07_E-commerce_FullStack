import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { apiClient } from "../../services/userApi";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart/cartContext";
import { CartItem } from "./CartItem";
import { AuthContext } from "../../context/User/userContext";

export const CartList = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { authStatus } = useContext(AuthContext);
  const [preferenceID, setPreferenceID] = useState(null);
  const mercadopagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

  initMercadoPago(mercadopagoPublicKey, {
    locale: "es-CL",
  });

  const [error, setError] = useState(null);
  const createPreference = async () => {
    if (cart.length === 0 && authStatus) {
      alert("El carrito está vacío.");
      return;
    }

    // Estructura los datos del carrito para enviarlos al backend
    const items = cart.map((product) => ({
      title: product.name,
      quantity: Number(product.quantity),
      unit_price: Number(product.price),
      currency_id: "CLP",
    }));

    try {
      const response = await apiClient.post(
        "/create_preference",
        { items } // Datos que envías al backend
      );

      if (response.data && response.data.id) {
        const preferenceId = response.data.id;

        console.log("Preferencia creada:", preferenceId);
        return preferenceId;
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      alert("Hubo un problema al procesar la compra.");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">
          Tu Carrito está vacío
        </h2>
        <p className="text-gray-600">
          Por favor, agrega productos para verlos aquí.
        </p>
      </div>
    );
  }

  const total = cart.reduce(
    (accum, product) => accum + product.price * product.quantity,
    0
  );
  const handlePay = async () => {
    if (authStatus) {
      const res = await createPreference();
      console.log(res);
      if (res) {
        setPreferenceID(res);
      }
    } else {
      setError("Inicie sesión para continuar la compra");
    }
  };
  return (
    <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {/* Sección izquierda: Productos */}
      <div className="col-span-2 bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Carro ({cart.length} {cart.length === 1 ? "producto" : "productos"})
        </h2>
        {cart.map((product) => (
          <CartItem product={product} key={product._id} />
        ))}

        <div className="mt-6 text-right">
          <button
            className="text-red-500 hover:text-red-600 font-semibold transition"
            onClick={clearCart}
          >
            Vaciar Carrito
          </button>
        </div>
      </div>

      {/* Sección derecha: Resumen */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          Resumen de la compra
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Productos ({cart.length})</span>
            <span>${total}</span>
          </div>

          <div className="flex justify-between font-bold text-gray-800">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
        <button
          className="w-full mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
          onClick={handlePay}
        >
          Continuar compra
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
        {preferenceID && (
          <Wallet initialization={{ preferenceId: preferenceID }} />
        )}
      </div>
    </div>
  );
};
