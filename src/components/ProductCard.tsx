import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "../styles/ProductCard.css";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
};

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });

    toast.success("Product added to cart 🛒");
  };

  const handleWishlist = () => {
    addToWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });

    toast.success("Added to Wishlist ❤️");
  };

  return (
    <div className="product-card fade-up">
      <img
        src={product.thumbnail}
        alt={product.title}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://placehold.co/400x300?text=No+Image";
        }}
      />

      <div className="product-info">
        <h3>{product.title}</h3>

        <p>{product.category}</p>

        <div className="price">
          ₹ {product.price.toLocaleString()}
        </div>

        <div className="card-buttons">
          <Link
            to={`/product/${product.id}`}
            style={{ flex: 1 }}
          >
            <button className="details-btn">
              Details
            </button>
          </Link>

          <button
            className="cart-btn"
            onClick={handleCart}
          >
            Cart
          </button>
        </div>

        <button
          className="wishlist-btn"
          onClick={handleWishlist}
        >
          ❤️ Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductCard;