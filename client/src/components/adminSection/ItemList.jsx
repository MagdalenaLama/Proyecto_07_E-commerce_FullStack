import { useState, useEffect } from "react";
import {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../../services/productApi";

export const ItemList = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
  });

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

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    createProduct(newProduct)
      .then((createdProduct) => {
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        setNewProduct({ name: "", price: "", stock: "", img: "" });
        setShowForm(false); // Oculta el formulario después de agregar
      })
      .catch((error) => console.error("Error creating product:", error));
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
        <div className="overflow-x-auto">
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
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Eliminar
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
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando Productos...</p>
      )}
      {/* Botón para agregar producto */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 block mx-auto"
      >
        Agregar Producto
      </button>
      {/* Formulario para agregar producto */}
      {showForm && (
        <form
          onSubmit={handleAddProduct}
          className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-md mx-auto"
        >
          <div className="mb-2">
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Precio</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Stock</label>
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Imagen (URL)</label>
            <input
              type="text"
              value={newProduct.img}
              onChange={(e) =>
                setNewProduct({ ...newProduct, img: e.target.value })
              }
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Guardar Producto
          </button>
        </form>
      )}
    </div>
  );
};
