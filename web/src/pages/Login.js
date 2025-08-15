"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import "../pages/Login.css";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passcode, setPasscode] = useState("")
  const [captchaValue, setCaptchaValue] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Check for session expiry message
  useEffect(() => {
    const location = window.location;
    if (location.state && location.state.message) {
      setError(location.state.message);
    }
  }, []);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!captchaValue) {
      setError("Please complete the CAPTCHA verification")
      return
    }

    try {
      setLoading(true)
      setError("")

      const response = await fetch("https://pet-shielders-main.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, passcode, captchaToken: captchaValue }),
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("userName", data.name)
      
      // Set session expiry to 15 minutes from now
      const expiryTime = new Date().getTime() + (15 * 60 * 1000); // 15 minutes
      localStorage.setItem("tokenExpiry", expiryTime.toString())
      
      window.location.href= "/"
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="session-info">
          <p><strong>Note:</strong> Your session will expire after 15 minutes of inactivity.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
         
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your actual site key
              onChange={handleCaptchaChange}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login    
