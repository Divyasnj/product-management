import { useState, useEffect } from "react";

function ProductForm({ onSubmit, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null); // file
  const [preview, setPreview] = useState(null); // preview URL
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        category: editingProduct.category || "",
      });
      if (editingProduct.imageUrl) {
        setPreview(editingProduct.imageUrl);
      }
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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

    // ✅ Build FormData for file upload
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (image) formData.append("image", image);

    onSubmit(formData, editingProduct?._id);

    // Reset only for Add
    if (!editingProduct) {
      setForm({ name: "", price: "", description: "", category: "" });
      setImage(null);
      setPreview(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
    >
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
        <h3 className="text-2xl font-bold text-white">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h3>
      </div>

      {/* Form Fields */}
      <div className="p-8 space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a short description"
            rows={3}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 active:scale-95 transition-transform"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
