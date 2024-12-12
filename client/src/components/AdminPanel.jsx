import { useState } from "react";
import EditableProductTable from "./EditableProductTable";

const AdminPanel = () => {
  const [products, setProducts] = useState([
    { _id: "1", name: "Product 1", price: 10, stock: 50, img: "image1.jpg" },
    { _id: "2", name: "Product 2", price: 20, stock: 30, img: "image2.jpg" },
  ]);

  const handleUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Product Panel</h1>
      <EditableProductTable products={products} onUpdate={handleUpdate} />
    </div>
  );
};

export default AdminPanel;
