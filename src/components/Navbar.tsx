import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { darkMode, toggleTheme } = useTheme();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <h2 className="logo">🛍️ Velora</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/wishlist">
          ❤️ Wishlist ({wishlist.length})
        </Link>

        <Link to="/cart">
          🛒 Cart ({cartCount})
        </Link>

        <Link to="/orders">
          📦 My Orders
        </Link>

        <Link to="/contact">
          Contact
        </Link>

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;