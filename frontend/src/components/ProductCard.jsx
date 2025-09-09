function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white flex flex-col justify-between
                    transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div>
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
        <p className="text-sm">{product.description}</p>
        <p className="text-xs text-blue-500">{product.category}</p>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(product)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-blue-500 transition-colors"
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
