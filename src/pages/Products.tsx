import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";
import "../styles/Products.css";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [sortOrder, setSortOrder] =
    useState("default");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    console.log("Loading Products...");

    const { data, error } = await supabase
      .from("products")
      .select("*");

    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);

    if (error) {
      console.log(error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  const categories = [
    ...new Set(
      products
        .map((p) => p.category)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const title = product.title || "";

      const matchesSearch = title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sortOrder) {
      case "lowToHigh":
        filtered.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "highToLow":
        filtered.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "name":
        filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
    }

    return filtered;
  }, [
    products,
    search,
    selectedCategory,
    sortOrder,
  ]);

  if (loading) {
    return (
      <div className="products-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="products-title">
        Our Products
      </h1>

      <input
        className="search-input"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        value={sortOrder}
        onChange={(e) =>
          setSortOrder(e.target.value)
        }
      >
        <option value="default">
          Sort By
        </option>

        <option value="lowToHigh">
          Price Low → High
        </option>

        <option value="highToLow">
          Price High → Low
        </option>

        <option value="name">
          Name A-Z
        </option>
      </select>

      <div className="category-buttons">
        <button
          onClick={() =>
            setSelectedCategory("all")
          }
        >
          All
        </button>

        {categories.map((category, index) => (
          <button
            key={`${category}-${index}`}
            onClick={() =>
              setSelectedCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      <p>
        {filteredProducts.length} Products
      </p>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.image,
                category: product.category,
              }}
            />
          ))
        ) : (
          <h2>No Products Found</h2>
        )}
      </div>
    </div>
  );
}

export default Products;