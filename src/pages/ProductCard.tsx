import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "../styles/ProductCard.css";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  discountPercentage: number;
  stock: number;
};

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
      />

      <h3>{product.title}</h3>

      <p className="price">
        ₹ {product.price}
      </p>

      <p className="rating">
        ⭐ {product.rating}
      </p>

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

      <div className="buttons">
        <button
          className="details-btn"
          onClick={() => {
            addToWishlist(product);
            toast.success(
              "❤️ Added to Wishlist"
            );
          }}
        >
          ❤️ Wishlist
        </button>

        <button
          className="cart-btn"
          onClick={() => {
            addToCart(product);
            toast.success(
              "🛒 Added to Cart"
            );
          }}
        >
          🛒 Add to Cart
        </button>
      </div>

      <Link to={`/product/${product.id}`}>
        <button className="view-btn">
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;