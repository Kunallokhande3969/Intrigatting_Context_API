import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/Products";

const Nav = () => {
  const [products] = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products && products.length > 0) {
      const distinct_category = [...new Set(products.map((p) => p.category))];
      setCategories(distinct_category);
    }
  }, [products]);

  
  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleAddNewProductClick = () => {
    navigate("/create");
  };

  return (
    <nav className="bg-gray-800 text-white min-h-screen w-[18vw] hidden md:flex flex-col justify-between p-6 shadow-lg">
      <div className="flex flex-col gap-6">
        <button
          onClick={handleAddNewProductClick}
          className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md font-medium transition duration-200"
        >
          ➕ Add New Product
        </button>

        <hr className="border-gray-500" />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">🗂️ Category Filter</h2>

          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className="flex items-center gap-3 hover:text-gray-300 transition w-full text-left"
            >
              <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
              <span className="capitalize">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-400">
        <p>© 2025 KunalShop</p>
      </div>
    </nav>
  );
};

export default Nav;
