import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Check if token has expired (15 minutes)
      const now = new Date().getTime();
      const expiryTime = parseInt(tokenExpiry);
      
      if (now > expiryTime) {
        // Token expired, clear storage and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login', { 
          state: { 
            message: 'Your session has expired. Please login again.' 
          } 
        });
        return;
      }

      // Token is valid, extend session by 15 minutes
      const newExpiry = now + (15 * 60 * 1000); // 15 minutes
      localStorage.setItem('tokenExpiry', newExpiry.toString());
      
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();

    // Set up interval to check auth every minute
    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-required-container">
        <div className="auth-required-card">
          <h2>Authentication Required</h2>
          <p>You need to be logged in to access this feature.</p>
          <div className="auth-required-actions">
            <button 
              onClick={() => navigate('/login')} 
              className="btn btn-primary"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="btn btn-secondary"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthGuard; 