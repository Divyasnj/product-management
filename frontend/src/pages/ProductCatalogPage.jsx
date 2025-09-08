import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function ProductCatalogPage({ products, deleteProduct, sortOrder, setSortOrder, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  const handleEdit = (product) => {
    navigate("/add-product", { state: { product } });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Product Catalog</h2>

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-600">Sort by Price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...products]
          .filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
          )
          .map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onDelete={deleteProduct}
              onEdit={handleEdit}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductCatalogPage;
