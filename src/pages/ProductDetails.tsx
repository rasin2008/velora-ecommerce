import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "../styles/ProductDetails.css";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
};

function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(id))
        .single();

      console.log("Product:", data);
      console.log("Error:", error);

      if (error) {
        setProduct(null);
      } else {
        setProduct(data);
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>❌ Product Not Found</h2>;
  }

  return (
    <div className="details-container">
      <div className="details-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="details-info">
        <h1>{product.title}</h1>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <h2>₹ {product.price}</h2>

        <p>{product.description}</p>

        <p>
          {product.stock > 0
            ? "✅ In Stock"
            : "❌ Out of Stock"}
        </p>

        <div className="action-buttons">
          <button
            className="cart-btn"
            onClick={() => {
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.image,
              });

              toast.success("🛒 Added to Cart");
            }}
          >
            Add to Cart
          </button>

          <button
            className="wish-btn"
            onClick={() => {
              addToWishlist({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.image,
              });

              toast.success("❤️ Added to Wishlist");
            }}
          >
            Wishlist
          </button>
        </div>

        <Link to="/products">
          <button className="back-btn">
            ← Back to Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;