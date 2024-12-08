import { useContext } from "react";
import { CartContext } from "../../context/Cart/cartContext";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { cart, clearCart } = useContext(CartContext);

  if (!cart || cart.lenght === 0) {
    return (
      <div className="cart-list empty">
        <h2>Tu Carrito esta vacío</h2>
        <p>Por favor Agrega Productos para verlos aquí</p>
      </div>
    );
  }

  const total = cart.reduce(
    (accum, product) => accum + product.price * product.quantity,
    0
  );

  return (
    <div className="cart-list">
      <h2>Tu Carrito</h2>
      {cart.map((product) => (
        <CartItem product={product} key={product._id} />
      ))}

      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="button button-clear" onClick={clearCart}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};
