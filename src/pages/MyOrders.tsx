import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

import "../styles/MyOrders.css";

type Order = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
  created_at: string;
};

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="orders-container">
        <h1>Loading...</h1>
      </div>
    );
  }

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

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <img
            src={order.thumbnail}
            alt={order.title}
            className="order-image"
          />

          <div>
            <h3>{order.title}</h3>

            <p>Price : ₹ {order.price}</p>

            <p>Quantity : {order.quantity}</p>

            <p>Total : ₹ {order.total}</p>

            <p>
              Ordered :
              {" "}
              {new Date(
                order.created_at
              ).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;