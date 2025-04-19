import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import CategoryPage from "./components/CategoryPage";
import CreateProduct from "./components/CreateProduct";
import ProductProvider from "./context/Products";

const App = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </ProductProvider>
  );
};

export default App;
