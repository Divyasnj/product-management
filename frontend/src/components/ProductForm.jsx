import { useState, useEffect } from "react";

function ProductForm({ onSubmit, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (image) formData.append("image", image);

    onSubmit(formData, editingProduct?._id);

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
      {/* Header */}
      <div className="bg-blue-700 p-6 text-center">
        <h3 className="text-3xl font-extrabold text-white tracking-wide">
          {editingProduct ? "✏️ Edit Product" : "➕ Add Product"}
        </h3>
      </div>

      {/* Fields */}
      <div className="p-8 space-y-6 text-gray-900">
        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800 text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-600 text-sm font-semibold">{errors.name}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800 text-lg">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-600 text-sm font-semibold">{errors.price}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800 text-lg">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a short description"
            rows={3}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-base font-medium text-gray-900 resize-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800 text-lg">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {errors.category && (
            <p className="text-red-600 text-sm font-semibold">
              {errors.category}
            </p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-semibold text-gray-800 text-lg">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-700"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-40 h-40 object-cover rounded-lg border shadow"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-bold shadow-md hover:bg-blue-800 active:scale-95 transition-transform"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
