import { useNavigate } from "react-router-dom";
import "@/styles/homepage.css";
import Header from "@/components/Header/Header";
const HomePage = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/select-role");
  };
  return <div className="homepage">
      <Header />
      {
    /* Hero Section */
  }
      <header className="hero-section">
        <h1 className="title">Edventures</h1>
        <h2 className="subtitle">Learn smarter. Teach better. Engage effortlessly.</h2>
        <p className="description">
          Seamless to use. Built for modern education. Connect, create, and gamify learning with ease.
        </p>
        <div className="cta-buttons">
          <button className="start-now" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </header>
    </div>;
};
export default HomePage;
