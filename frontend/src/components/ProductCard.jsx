import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useEffect, useState } from "react";

function ProductCard({ product, onDelete, onEdit, onAddToCart }) {
  const { cart } = useCart();
  const navigate = useNavigate();

  // 🔥 LOCAL OPTIMISTIC STATE
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  // 🔄 Sync local state with cart
  useEffect(() => {
  const exists = cart.some(
    (item) =>
      (item.productId?._id || item.productId) === product._id
  );
  setAdded(exists);
}, [cart, product._id]);


  const handleAdd = async () => {
    setAdding(true);
    setAdded(true); // ✅ instant UI update
    await onAddToCart();
    setAdding(false);
  };

  return (
    <div className="border rounded-lg shadow p-5 bg-white flex flex-col justify-between">
      <div>
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-contain mb-4 bg-gray-100 rounded"
          />
        )}

        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-green-700 font-bold">₹{product.price}</p>
      </div>

      {/* ✅ FINAL CART BUTTON */}
      <button
        disabled={adding}
        onClick={() =>
          added ? navigate("/cart") : handleAdd()
        }
        className={`mt-4 px-4 py-2 rounded text-white ${
          added
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-teal-600 hover:bg-teal-700"
        }`}
      >
        {added
          ? "Go to Cart"
          : adding
          ? "Adding..."
          : "Add to Cart"}
      </button>

      {/* Admin */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(product)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
