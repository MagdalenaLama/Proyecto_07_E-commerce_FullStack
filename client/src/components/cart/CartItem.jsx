import { useContext } from "react";
import { CartContext } from "../../context/Cart/cartContext";

export const CartItem = ({ product }) => {
  const { id, title, image, price } = product;

  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className="cart-item">
      <img className="cart-item__image" src={image} alt={title} />
      <div className="cart-item__details">
        <h3>{title}</h3>
        <p>Precio: ${price}</p>
        <div className="quantity-control">
          <button
            className="button"
            onClick={() => decreaseQuantity(id)}
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button className="button" onClick={() => increaseQuantity(id)}>
            +
          </button>
        </div>
        <p>Subtotal: ${(price * product.quantity).toFixed(2)}</p>
      </div>
      <button
        className="button remove-button"
        onClick={() => removeFromCart(id)}
      >
        Eliminar
      </button>
    </div>
  );
};
