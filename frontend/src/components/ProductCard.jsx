function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div>
        {/* Product Image */}
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-contain rounded-md mb-3 bg-gray-100"
          />
        )}

        {/* Product Details */}
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
        <p className="text-sm text-gray-700">{product.description}</p>
        <p className="text-xs text-blue-500">{product.category}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(product)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
