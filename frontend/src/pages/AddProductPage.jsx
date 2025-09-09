import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function AddProductPage({ addProduct }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Get editing product from location state (if any)
  const editingProduct = location.state?.product || null;

  const handleSubmit = async (productData, id) => {
    await addProduct(productData, id); // ✅ pass ID if editing
    navigate("/products"); // redirect after save
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      {/* ✅ Now consistent with ProductForm */}
      <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} />
    </div>
  );
}

export default AddProductPage;
