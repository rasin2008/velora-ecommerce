import { Link } from "react-router-dom";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="success-container">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with <b>Velora</b>.
        </p>

        <p>
          Your order has been received and will be processed shortly.
        </p>

        <Link to="/products">
          <button className="shop-btn">
            Continue Shopping
          </button>
        </Link>

        <Link to="/">
          <button className="home-btn">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;