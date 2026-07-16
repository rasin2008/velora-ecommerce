import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "../styles/ProductDetails.css";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
};

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details-container">
      <div className="details-image">
        <img
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className="details-info">
        <h1>{product.title}</h1>

        <p className="brand">
          Brand : {product.brand}
        </p>

        <p className="category">
          Category : {product.category}
        </p>

        <p className="rating">
          ⭐ {product.rating}
        </p>

        <h2 className="price">
          ₹ {product.price}
        </h2>

        <p className="discount">
          🔥 {product.discountPercentage}% OFF
        </p>

        <p
          className={
            product.stock > 0
              ? "stock in-stock"
              : "stock out-stock"
          }
        >
          {product.stock > 0
            ? "✅ In Stock"
            : "❌ Out of Stock"}
        </p>

        <p className="description">
          {product.description}
        </p>

        <div className="action-buttons">
          <button
            className="cart-btn"
            onClick={() => {
              addToCart(product);
              toast.success("🛒 Added to Cart");
            }}
          >
            Add to Cart
          </button>

          <button
            className="wish-btn"
            onClick={() => {
              addToWishlist(product);
              toast.success(
                "❤️ Added to Wishlist"
              );
            }}
          >
            Wishlist
          </button>
        </div>

        <Link to="/products">
          <button className="back-btn">
            ← Back to Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;