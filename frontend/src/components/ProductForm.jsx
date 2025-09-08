import { useState, useEffect } from "react";

function ProductForm({ onAdd, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form when editing
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        category: editingProduct.category || "",
      });
    }
  }, [editingProduct]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.price) newErrors.price = "Price is required";
    else if (Number(form.price) <= 0) newErrors.price = "Price must be > 0";
    if (!form.category.trim()) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd({ ...form, price: Number(form.price) });
    setForm({ name: "", price: "", description: "", category: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md hover:shadow-lg rounded-lg p-6 space-y-4 transition-shadow"
    >
      <h3 className="text-xl font-bold text-gray-700 text-center">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h3>

      {/* Name */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">{errors.name}</span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-600">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.price && (
          <span className="text-red-500 text-sm mt-1">{errors.price}</span>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-600">Description</label>
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
          rows={3}
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-600">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.category && (
          <span className="text-red-500 text-sm mt-1">{errors.category}</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
