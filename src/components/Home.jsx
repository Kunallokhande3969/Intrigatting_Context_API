import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/Products";
import ProductList from "./ProductList";

const Nav = () => {
  const [products] = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueCategories = [...new Set(products.map((p) => p.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    setIsMobileNavOpen(false);
  };

  const handleAddNewProductClick = () => {
    navigate("/create");
    setIsMobileNavOpen(false);
  };
  
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* 📱 Mobile Nav Toggle Button */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        aria-label={isMobileNavOpen ? "Close Menu" : "Open Menu"}
      >
        {isMobileNavOpen ? "✖ Close" : "☰ Menu"}
      </button>

      {/* 📱 Backdrop on Mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-6 fixed md:static z-40 top-0 left-0 h-full flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:flex md:flex-shrink-0`}
      >
        <div>
          <button
            onClick={handleAddNewProductClick}
            className="bg-blue-600 hover:bg-blue-500 w-full py-2 rounded-lg font-semibold transition mb-6"
          >
            ➕ Add New Product
          </button>

          <h2 className="text-xl font-semibold mb-4">🗂️ Category Filter</h2>
          <div className="flex flex-col gap-3">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(cat)}
                className="flex items-center gap-3 text-left hover:text-gray-300 capitalize transition"
              >
                <div className="h-4 w-4 bg-gray-500 rounded-full"></div>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-6">© 2025 KunalShop</p>
      </aside>

      {/* Product List */}
      <main
        className={`flex-1 bg-gray-100 p-2 transition-all duration-300 ease-in-out md:ml-2 overflow-y-auto`}
      >
        <ProductList products={products} />
      </main>
    </div>
  );
};

export default Nav;
