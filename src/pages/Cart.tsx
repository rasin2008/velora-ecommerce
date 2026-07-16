import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>🛒 Your Cart is Empty</h2>
        <Link to="/products">
          <button>Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img
            src={item.thumbnail}
            alt={item.title}
          />

          <div className="cart-details">
            <h3>{item.title}</h3>

            <p>₹ {item.price}</p>

            <div className="quantity">
              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
              >
                +
              </button>
            </div>
          </div>

          <button
            className="remove-btn"
            onClick={() =>
              removeFromCart(item.id)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-footer">
        <h2>Total : ₹ {total}</h2>

        <Link to="/checkout">
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;