import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      toast.error("Please fill all fields");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please Login First");
      navigate("/login");
      return;
    }

    for (const item of cart) {
      const { error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          product_id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
          thumbnail: item.thumbnail,
          customer_name: name,
          phone: phone,
          address: address,
          payment: payment,
        });

      if (error) {
        console.log("ORDER ERROR:", error);
        toast.error(error.message);
        return;
      }
    }

    toast.success("Order Placed Successfully 🎉");

    clearCart();

    navigate("/orders");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <form
        className="checkout-form"
        onSubmit={handleOrder}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <select
          value={payment}
          onChange={(e) =>
            setPayment(e.target.value)
          }
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
        </select>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-row">
            <span>Total</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="place-order-btn"
          type="submit"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;