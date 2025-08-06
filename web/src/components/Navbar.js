import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      const usrName = localStorage.getItem("userName");
      
      if (!token || !usrName) {
        setIsLoggedIn(false);
        setUserName("");
        return;
      }

      // Check if token has expired
      const now = new Date().getTime();
      const expiryTime = parseInt(tokenExpiry);
      
      if (now > expiryTime) {
        // Token expired, clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        setUserName("");
        return;
      }

      setIsLoggedIn(true);
      setUserName(usrName);
    };

    checkAuth();

    // Check auth every minute
    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("userName");
    window.location.reload(); // simple reload to reset state
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => window.scrollTo(0, 0)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
          </svg>
          <span>PetShielders</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-toggle-icon"></span>
        </button>

        <nav className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link" onClick={() => window.scrollTo(0, 0)}>Home</Link>
          <Link to="/pets" className="navbar-link" onClick={() => window.scrollTo(0, 0)}>Get a Friend</Link>
          <Link to="/about" className="navbar-link" onClick={() => window.scrollTo(0, 0)}>About Us</Link>
          <Link to="/contact" className="navbar-link" onClick={() => window.scrollTo(0, 0)}>Contact</Link>
          <Link to="/rescue" className="navbar-link" onClick={() => window.scrollTo(0, 0)}>Rescue</Link>
        </nav>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <span className="navbar-user">👤 {userName}</span>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>
              Register/Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
