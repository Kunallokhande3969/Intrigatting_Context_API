import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* 🔍 Enhanced Search Bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className={`relative transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className={`h-5 w-5 ${isSearchFocused ? "text-blue-500" : "text-gray-400"}`} />
          </div>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="block w-full pl-10 pr-12 py-4 border-0 rounded-xl bg-gray-50 shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
    
      </div>

      {/* 🧾 No Products Message */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700">No products found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <Link
              to={`/details/${product.id}`}
              key={product.id}
              className="group relative"
            >
              <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden flex flex-col h-full">
                {/* Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Quick view badge */}
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.rating && (
                      <div className="flex items-center text-xs text-gray-500">
                        <svg
                          className="w-4 h-4 text-yellow-400 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {product.rating.rate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;