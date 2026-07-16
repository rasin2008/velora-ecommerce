import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "../styles/Wishlist.css";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-container">
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2 className="empty">Your Wishlist is Empty!</h2>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="wishlist-image"
              />

              <h3>{product.title}</h3>

              <p className="price">₹ {product.price}</p>

              <div className="wishlist-buttons">
                <button
                  className="cart-btn"
                  onClick={() => {
                    addToCart(product);
                    toast.success("🛒 Added to Cart");
                  }}
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => {
                    removeFromWishlist(product.id);
                    toast.error("❌ Removed from Wishlist");
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;