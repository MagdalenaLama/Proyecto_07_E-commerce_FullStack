import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart/cartContext";

export const ProductItem = ({ product }) => {
  const { name, price, img } = product;
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () =>
    setQuantity((prev) => parseFloat((prev + 0.5).toFixed(1)));
  const handleDecrement = () =>
    setQuantity((prev) =>
      prev > 0.5 ? parseFloat((prev - 0.5).toFixed(1)) : prev
    );

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
      <a className="relative flex h-60 overflow-hidden" href="#">
        <img
          className="absolute top-0 right-0 h-full w-full object-cover"
          src={img}
          alt={name}
        />
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">{name}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">{`$ ${price}/Kg`}</span>
          </p>
          <div>
            <button
              onClick={handleDecrement}
              className="flex items-center justify-center bg-gray-300 px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-400"
            >
              -
            </button>
            <p className="text-lg font-semibold text-gray-800">{quantity} </p>
            <button
              onClick={handleIncrement}
              className="flex items-center justify-center bg-gray-300 px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-400"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
