import React, { useState, useContext } from "react";
import { ProductContext } from "../context/Products";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [_, addProduct] = useContext(ProductContext);

  const validate = () => {
    let newErrors = {};
    if (!product.title) newErrors.title = "Title is required.";
    if (!product.price) newErrors.price = "Price is required.";
    if (!product.category) newErrors.category = "Category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Add product to context
      addProduct(product);

      // Simulate API call
      console.log("New Product:", product);
      alert("Product added successfully!");
      setProduct({
        title: "",
        price: "",
        image: "",
        category: "",
        description: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          ➕ Create New Product
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Product Title */}
          <div className="relative">
            <input
              type="text"
              name="title"
              placeholder="📝 Product Title"
              value={product.title}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
            {errors.title && (
              <span className="text-red-500 text-sm absolute right-0 bottom-0">
                {errors.title}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="relative">
            <input
              type="number"
              name="price"
              placeholder="💰 Price"
              value={product.price}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
            {errors.price && (
              <span className="text-red-500 text-sm absolute right-0 bottom-0">
                {errors.price}
              </span>
            )}
          </div>

          {/* Image URL */}
          <div className="relative">
            <input
              type="text"
              name="image"
              placeholder="🖼️ Image URL"
              value={product.image}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <input
              type="text"
              name="category"
              placeholder="📦 Category"
              value={product.category}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
            {errors.category && (
              <span className="text-red-500 text-sm absolute right-0 bottom-0">
                {errors.category}
              </span>
            )}
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="🧾 Description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>

          {/* Image Preview */}
          {product.image && (
            <div className="mt-4 text-center">
              <img
                src={product.image}
                alt="Preview"
                className="w-32 h-32 object-cover mx-auto rounded-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-md transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Adding Product..." : "➕ Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
