import { useState } from "react";
import toast from "react-hot-toast";

import "../styles/Contact.css";

function Contact() {
  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success(
      "Message Sent Successfully ✉️"
    );

    setName("");

    setEmail("");

    setMessage("");
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button
          className="send-btn"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;