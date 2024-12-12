import { useState, useEffect } from "react";
import { getAllProducts, updateProduct } from "../../services/productApi";

export const ItemList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  const handleSave = (id, updatedProduct) => {
    updateProduct(id, updatedProduct)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, ...updatedProduct } : product
          )
        );
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleChange = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, [field]: value } : product
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {products.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Nombre
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Precio
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Stock
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Guardar
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Notificar
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleChange(product._id, "name", e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleChange(product._id, "price", e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) =>
                      handleChange(product._id, "stock", e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleSave(product._id, product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Notificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">Cargando Productos...</p>
      )}
    </div>
  );
};
