import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductCatalogPage({ products, deleteProduct, sortOrder, setSortOrder, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const [priceFilter, setPriceFilter] = useState("all"); // NEW state

  const handleEdit = (product) => {
    navigate("/add-product", { state: { product } });
  };

  // Filtering logic
  const filteredProducts = [...products]
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) => {
      if (priceFilter === "under1000") return p.price < 1000;
      if (priceFilter === "1000to5000") return p.price >= 1000 && p.price <= 5000;
      if (priceFilter === "above5000") return p.price > 5000;
      return true; // "all"
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Product Catalog</h2>

      {/* Search, Sort & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 flex-wrap">
        
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

        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-600">Filter:</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All</option>
            <option value="under1000">Under ₹1000</option>
            <option value="1000to5000">₹1000 - ₹5000</option>
            <option value="above5000">Above ₹5000</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
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
