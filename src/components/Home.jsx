import React from "react";
import party_img from "../img/party.png";
import { useNavigate } from 'react-router-dom';
import "../App.css";

function Home() {

  const navigate = useNavigate();
  return (
    <section className="home-section">
      <div className="home-content">
        <h1 className="home-title">Discover Your Next Favorite Vinyl at</h1>
        <h1 className="home-title">Life's A Party</h1>
        <img src={party_img} alt="Party" className="home-image" />
      </div>
      <p className="home-description">
        Welcome to Life's A Party, the ultimate destination for vinyl
        enthusiasts and music aficionados. Dive into a curated collection of
        timeless records, rare finds, and the latest releases, all in one place.
        Whether you're a seasoned collector or a newcomer to the world of vinyl,
        our diverse selection ensures you'll find something to ignite your
        passion for music.
      </p>
      <h2 className="home-subtitle">Why Choose Us?</h2>
      <ul className="home-features">
        <li>Curated Collection</li>
        <li>Exclusive Releases</li>
        <li>Detailed Reviews</li>
        <li>User-Friendly Experience</li>
        <li>Passionate Community</li>
      </ul>
      <p className="home-call-to-action">Explore. Review. Connect.</p>
      <div className="home-buttons">
        <button className="home-button"onClick={() => navigate("/shop")}>Shop Now</button>
        <button className="home-button" onClick={() => navigate("/products")}>Read Reviews</button>
        <button className="home-button"onClick={() => navigate("/register")}>Join the Community</button>
      </div>
    </section>
  );
}

export default Home;
