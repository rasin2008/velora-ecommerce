import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>🛍️ Velora</h2>
          <p>
            Smart Shopping, Better Living.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/wishlist">Wishlist</a>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📧 support@velora.com</p>
          <p>📞 +91 9876543210</p>
          <p>📍 Kerala, India</p>
        </div>
      </div>

      <hr />

      <p className="copyright">
        © 2026 Velora. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;