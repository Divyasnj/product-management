import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";

function ProductCatalogPage({
  products,
  deleteProduct,
  sortOrder,
  setSortOrder,
  searchTerm,
  setSearchTerm,
}) {
  const navigate = useNavigate();
  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { addToCart } = useCart();


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleEdit = (product) => {
    navigate("/add-product", { state: { product } });
  };

  // Extract unique categories dynamically
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filtering logic
  const filteredProducts = [...products]
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) => {
      if (priceFilter === "under1000") return p.price < 1000;
      if (priceFilter === "1000to5000") return p.price >= 1000 && p.price <= 5000;
      if (priceFilter === "above5000") return p.price > 5000;
      return true;
    })
    .filter((p) => {
      if (categoryFilter === "all") return true;
      return p.category === categoryFilter;
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, priceFilter, categoryFilter]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Product Catalog</h2>

      {/* Search, Sort & Filter Controls */}
<div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 flex-wrap bg-white shadow-md p-4 rounded-lg">
  {/* Search */}
  <div className="flex-1 min-w-[200px]">
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition placeholder-gray-500"
    />
  </div>

  {/* Sort */}
  <div className="flex items-center gap-2">
    <label className="font-medium text-gray-700">Sort by Price:</label>
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
    >
      <option value="asc">Low → High</option>
      <option value="desc">High → Low</option>
    </select>
  </div>

  {/* Price Filter */}
  <div className="flex items-center gap-2">
    <label className="font-medium text-gray-700">Price:</label>
    <select
      value={priceFilter}
      onChange={(e) => setPriceFilter(e.target.value)}
      className="bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
    >
      <option value="all">All</option>
      <option value="under1000">Under ₹1000</option>
      <option value="1000to5000">₹1000 - ₹5000</option>
      <option value="above5000">Above ₹5000</option>
    </select>
  </div>

  {/* Category Filter */}
  <div className="flex items-center gap-2">
    <label className="font-medium text-gray-700">Category:</label>
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
    >
      {categories.map((c) => (
        <option key={c} value={c}>
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </option>
      ))}
    </select>
  </div>
</div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onDelete={deleteProduct}
            onEdit={handleEdit}
            onAddToCart={() => addToCart(p._id)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCatalogPage;
