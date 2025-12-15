// App.js
import React, { useState } from 'react';
import './login.module.css';    

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password, rememberMe });
    // Di sini biasanya akan ada logika untuk mengirim data ke backend
    alert(`Welcome, ${username || 'cosmic traveler'}! Your destiny awaits...`);
  };

  return (
    <div className="astro-login-container">
      {/* Background dengan pola bintang */}
      <div className="stars-background"></div>
      <div className="stars-background stars-background-2"></div>
      
      <div className="astro-login-card">
        {/* Logo/gambar utama - sementara menggunakan warna pink */}
        <div className="logo-container">
          {/* Untuk gambar asli: <img src="/path-to-astro-logo.png" alt="Astro Oracles Logo" className="astro-logo" /> */}
          <div className="astro-logo-placeholder">
            <div className="planet"></div>
            <div className="orbit"></div>
            <div className="stars-small"></div>
            <div className="stars-small stars-small-2"></div>
          </div>
          <h1 className="title">ASTRO ORACLES</h1>
          <p className="subtitle">Unlock Your Cosmic Destiny</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your cosmic name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">
            LOG IN
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <p className="social-text">Connect with your celestial profile</p>
            <div className="social-buttons">
              {/* Untuk gambar asli: <img src="/path-to-google-icon.png" alt="Google" /> */}
              <button className="social-button google">
                <div className="social-icon pink-icon"></div>
                Google
              </button>
              
              {/* Untuk gambar asli: <img src="/path-to-facebook-icon.png" alt="Facebook" /> */}
              <button className="social-button facebook">
                <div className="social-icon pink-icon"></div>
                Facebook
              </button>
              
              {/* Untuk gambar asli: <img src="/path-to-twitter-icon.png" alt="Twitter" /> */}
              <button className="social-button twitter">
                <div className="social-icon pink-icon"></div>
                Twitter
              </button>
            </div>
          </div>

          <p className="signup-link">
            Dont have a cosmic account? <a href="#signup">Sign up now</a>
          </p>
        </form>

        <div className="footer">
          <p>© 2023 Astro Oracles. All cosmic rights reserved.</p>
          <p>
            <a href="#terms">Terms of Service</a> | <a href="#privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;