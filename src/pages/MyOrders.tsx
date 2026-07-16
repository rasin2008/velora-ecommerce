import { Link } from "react-router-dom";
import "../styles/MyOrders.css";

function MyOrders() {
  const orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h1>My Orders</h1>
        <p>No Orders Yet.</p>

        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.map((order: any, index: number) => (
        <div className="order-card" key={index}>
          <h3>Order #{index + 1}</h3>

          {order.map((item: any) => (
            <div
              className="order-item"
              key={item.id}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
              />

              <div>
                <h4>{item.title}</h4>

                <p>₹ {item.price}</p>

                <p>
                  Quantity : {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;