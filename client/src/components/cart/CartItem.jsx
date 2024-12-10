import { useContext } from "react";
import { CartContext } from "../../context/Cart/cartContext";

export const CartItem = ({ product }) => {
  const { _id, name, img, price } = product;

  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className="cart-item">
      <img className="cart-item__image" src={img} alt={name} />
      <div className="cart-item__details">
        <h3>{name}</h3>
        <p>Precio: ${price}</p>
        <div className="quantity-control">
          <button
            className="button"
            onClick={() => decreaseQuantity(_id)}
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button className="button" onClick={() => increaseQuantity(_id)}>
            +
          </button>
        </div>
        <p>Subtotal: ${(price * product.quantity).toFixed(2)}</p>
      </div>
      <button
        className="button remove-button"
        onClick={() => removeFromCart(_id)}
      >
        Eliminar
      </button>
    </div>
  );
};
