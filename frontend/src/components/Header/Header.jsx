import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@/styles/header.css";
import ThemeToggle from "@/components/ThemeToggle";
const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  return <nav className="navbar">
      <div className="logo-placeholder" onClick={toggleMenu}>
        Edventure
      </div>

      {
    /* Hamburger Menu */
  }
      <div
    className={`hamburger ${menuActive ? "active" : ""}`}
    onClick={toggleMenu}
  >
        <span />
        <span />
        <span />
      </div>

      {
    /* Nav Links */
  }
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      {
    /* Auth Buttons */
  }
      <div className="auth-buttons">
        <ThemeToggle />
        <button className="sign-up" onClick={() => navigate("/select-role")}>
          Sign Up
        </button>
        <button className="log-in" onClick={() => navigate("/login")}>
          Log In
        </button>
        <div className="user-avatar-placeholder">U</div>
      </div>

      {
    /* Pop-out Menu */
  }
      <div className={`nav-popout ${menuActive ? "active" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact Us</Link>
      </div>
    </nav>;
};
export default Header;
