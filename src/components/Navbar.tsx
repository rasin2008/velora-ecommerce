import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";

import { supabase } from "../lib/supabase";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { darkMode, toggleTheme } = useTheme();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setUser(null);

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          🛍️ <span>Velora</span>
        </Link>
      </div>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/products">
          Products
        </NavLink>

        <NavLink to="/contact">
          Contact
        </NavLink>

        <NavLink
          to="/wishlist"
          className="icon-link"
        >
          <FaHeart />

          <span className="badge">
            {wishlist.length}
          </span>
        </NavLink>

        <NavLink
          to="/cart"
          className="icon-link"
        >
          <FaShoppingCart />

          <span className="badge">
            {cart.length}
          </span>
        </NavLink>

        {user && (
          <NavLink to="/orders">
            Orders
          </NavLink>
        )}
      </nav>

      <div className="right-section">
        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        {user ? (
          <>
            <div className="user-email">
              <FaUserCircle />

              <span>
                {user.user_metadata
                  ?.full_name || user.email}
              </span>
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="login-btn"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="register-btn"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;