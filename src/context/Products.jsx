import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch data from API
  async function getData() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Function to add a new product
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: prevProducts.length + 1 },
    ]);
  };

  return (
    <ProductContext.Provider value={[products, addProduct]}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
