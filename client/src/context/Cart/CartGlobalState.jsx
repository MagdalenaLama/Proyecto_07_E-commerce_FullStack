import { useReducer } from "react";
import { CartContext } from "./cartContext";
import { CartReducer } from "./cartReducer";

const initialState = {
  cart: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productID) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productID });
  };

  const increaseQuantity = (productID) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: productID });
  };

  const decreaseQuantity = (productID) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: productID });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
