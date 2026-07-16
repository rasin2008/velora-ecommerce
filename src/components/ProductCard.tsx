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
};

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        <h3>{product.title}</h3>

        <p className="price">₹ {product.price}</p>
      </Link>

      <div className="buttons">
        <button
          className="wishlist-btn"
          onClick={() => {
            addToWishlist(product);
            toast.success("❤️ Product added to Wishlist");
          }}
        >
          ❤️ Wishlist
        </button>

        <button
          className="cart-btn"
          onClick={() => {
            addToCart(product);
            toast.success("🛒 Product added to Cart");
          }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;