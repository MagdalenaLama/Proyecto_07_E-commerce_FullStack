// export const CartItem = ({ product }) => {
//   const { _id, name, img, price } = product;

//   const { removeFromCart, increaseQuantity, decreaseQuantity } =
//     useContext(CartContext);

//   return (
//     <div className="cart-item">
//       <img className="cart-item__image" src={img} alt={name} />
//       <div className="cart-item__details">
//         <h3>{name}</h3>
//         <p>Precio: ${price}</p>
//         <div className="quantity-control">
//           <button
//             className="button"
//             onClick={() => decreaseQuantity(_id)}
//             disabled={product.quantity <= 1}
//           >
//             -
//           </button>
//           <span>{product.quantity}</span>
//           <button className="button" onClick={() => increaseQuantity(_id)}>
//             +
//           </button>
//         </div>
//         <p>Subtotal: ${(price * product.quantity).toFixed(2)}</p>
//       </div>
//       <button
//         className="button remove-button"
//         onClick={() => removeFromCart(_id)}
//       >
//         Eliminar
//       </button>
//     </div>
//   );
// };
import { useContext } from "react";
import { CartContext } from "../../context/Cart/cartContext";

export const CartItem = ({ product, onCheckboxChange }) => {
  const { _id, name, img, price, quantity } = product;

  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  // const handleDecrease = () => {
  //   console.log(quantity);
  //   decreaseQuantity();
  //   console.log(quantity);
  // };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm mb-3">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="form-checkbox text-gray-800"
          onChange={() => onCheckboxChange(_id)} // Notifica al padre sobre el cambio
        />
        <img
          src={img}
          alt={name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">Precio: ${price}</p>
          <p className="text-sm text-gray-600">Subtotal: ${price * quantity}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          onClick={() => decreaseQuantity(_id)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="text-gray-800">{quantity}</span>
        <button
          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          onClick={() => increaseQuantity(_id)}
        >
          +
        </button>
      </div>
      <button
        className="px-3 py-1 text-red-500 hover:text-red-600 font-semibold transition"
        onClick={() => removeFromCart(_id)}
      >
        Eliminar
      </button>
    </div>
  );
};
