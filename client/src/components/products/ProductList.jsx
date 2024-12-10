import { useState, useEffect } from "react";
import { getAllProducts } from "../../services/productApi";
import { ProductItem } from "./ProductItem";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando Productos...</p>
      )}
    </div>
  );
};
