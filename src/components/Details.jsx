import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/Products.jsx";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const product = products.find((p) => String(p.id) === id);

  const handleDelete = () => {
    if (x) {
      // Filter out the product to be deleted
      const updatedProducts = products.filter(p => String(p.id) !== id);
      setProducts(updatedProducts);
      // Navigate back to home after deletion
      navigate("/");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-gray-700">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 bg-white text-black flex flex-col items-center">
      <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:flex-row w-full max-w-6xl bg-gray-100 shadow-md rounded-xl overflow-hidden mb-10">
        <div className="w-full lg:w-[40%] flex justify-center items-center p-4 bg-white">
          <img
            className="object-contain h-[250px] sm:h-[300px] w-full max-w-xs"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="w-full lg:w-[60%] p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              {product.title}
            </h1>
            <p className="text-xl text-gray-700 mb-2">${product.price}</p>
            <p className="text-gray-600 mb-3">{product.description}</p>
            <p className="text-sm text-gray-500 italic">{product.category}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to={`/edit/${product.id}`}
              className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-md font-medium transition text-center"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="w-full sm:w-auto border border-red-400 text-red-400 hover:bg-red-100 px-6 py-2 rounded-md font-medium transition"
            >
              Delete
            </button>
          </div>
          <Link
            to="/"
            className="mt-6 text-blue-600 underline hover:text-blue-800 text-center sm:text-left"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;