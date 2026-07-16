import "../styles/Home.css";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover Amazing Products</h1>

        <p>Shop the latest collections at the best prices.</p>

        <button className="shop-btn">
          Shop Now
        </button>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
          alt="Shopping"
        />
      </div>
    </section>
  );
}

export default Home;