import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  discountPercentage: number;
  stock: number;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  return (
    <div className="products-container">
      <h1 className="products-title">Our Products</h1>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;