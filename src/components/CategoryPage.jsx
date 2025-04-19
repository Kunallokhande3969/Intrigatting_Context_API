import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/Products";

const CategoryPage = () => {
  const { category } = useParams();
  const [products] = useContext(ProductContext);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading products...</p>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase().trim() === category.toLowerCase().trim()
  );

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold mb-6 capitalize">
        Category: {category}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found in this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <Link to={`/details/${product.id}`}>
                <div className="flex flex-col items-center">
                  <div className="h-52 w-full flex items-center justify-center">
                    <img
                      className="h-full object-cover rounded-md"
                      src={product.image || "/default-image.jpg"}
                      alt={product.title}
                    />
                  </div>
                  <h2 className="text-lg font-semibold mt-4 text-center text-gray-700">
                    {product.title}
                  </h2>
                  <p className="text-md font-medium text-blue-600 mt-2">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
      <Link
        to="/"
        className="relative mt-20 text-blue-600 text-xl font-semibold group"
      >
        <span className="relative z-10 transition-all duration-300 group-hover:pl-3 group-hover:text-blue-800">
          ← Back to home
        </span>
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
      </Link>
    </div>
  );
};

export default CategoryPage;
