import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
};

type Category = {
  slug: string;
  name: string;
  url: string;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  // Load Products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  // Load Categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  // Search + Category Filter + Sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortOrder === "highToLow") {
        return b.price - a.price;
      }

      if (sortOrder === "name") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

  return (
    <div className="products-container">
      <h1 className="products-title">Our Products</h1>

      <input
        type="text"
        placeholder="Search Products..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="sort-container">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="lowToHigh">
            Price: Low to High
          </option>
          <option value="highToLow">
            Price: High to Low
          </option>
          <option value="name">
            Name (A - Z)
          </option>
        </select>
      </div>

      <div className="category-buttons">
        <button
          onClick={() =>
            setSelectedCategory("all")
          }
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() =>
              setSelectedCategory(
                category.slug
              )
            }
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;