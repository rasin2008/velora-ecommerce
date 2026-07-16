import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validation
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Cart Empty Check
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Save Order to LocalStorage
    const oldOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([...oldOrders, cart])
    );

    // Clear Cart
    clearCart();

    // Success Message
    toast.success("🎉 Order Placed Successfully!");

    // Redirect
    setTimeout(() => {
      navigate("/order-success");
    }, 2000);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
        >
          <option>Cash on Delivery</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
          <option>UPI</option>
        </select>

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;