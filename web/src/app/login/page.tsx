// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import styles from './login.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password, rememberMe });
    alert(`Welcome, ${username || 'cosmic traveler'}! Your destiny awaits...`);
  };

  return (
    <div className={styles.astroLoginContainer}>
      {/* Background dengan pola bintang */}
      <div className={styles.starsBackground}></div>
      <div className={`${styles.starsBackground} ${styles.starsBackground2}`}></div>
      
      <div className={styles.astroLoginCard}>
        {/* Logo/gambar utama - sementara menggunakan warna pink */}
        <div className={styles.logoContainer}>
          {/* Untuk gambar asli: <img src="/path-to-astro-logo.png" alt="Astro Oracles Logo" className={styles.astroLogo} /> */}
          <div className={styles.astroLogoPlaceholder}>
            <div className={styles.planet}></div>
            <div className={styles.orbit}></div>
            <div className={styles.starsSmall}></div>
            <div className={`${styles.starsSmall} ${styles.starsSmall2}`}></div>
          </div>
          <h1 className={styles.title}>ASTRO ORACLES</h1>
          <p className={styles.subtitle}>Unlock Your Cosmic Destiny</p>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Username
            </label>
            <input
              type="text"
              id="username"
              className={styles.formInput}
              placeholder="Enter your cosmic name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className={styles.forgotLink}>Forgot password?</a>
          </div>

          <button type="submit" className={styles.loginButton}>
            LOG IN
          </button>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <div className={styles.socialLogin}>
            <p className={styles.socialText}>Connect with your celestial profile</p>
            <div className={styles.socialButtons}>
              {/* Untuk gambar asli: <img src="/path-to-google-icon.png" alt="Google" /> */}
              <button type="button" className={`${styles.socialButton} ${styles.google}`}>
                <div className={`${styles.socialIcon} ${styles.pinkIcon}`}></div>
                Google
              </button>
              
              {/* Untuk gambar asli: <img src="/path-to-facebook-icon.png" alt="Facebook" /> */}
              <button type="button" className={`${styles.socialButton} ${styles.facebook}`}>
                <div className={`${styles.socialIcon} ${styles.pinkIcon}`}></div>
                Facebook
              </button>
              
              {/* Untuk gambar asli: <img src="/path-to-twitter-icon.png" alt="Twitter" /> */}
              <button type="button" className={`${styles.socialButton} ${styles.twitter}`}>
                <div className={`${styles.socialIcon} ${styles.pinkIcon}`}></div>
                Twitter
              </button>
            </div>
          </div>

          <p className={styles.signupLink}>
            Don&apos;t have a cosmic account? <a href="#signup">Sign up now</a>
          </p>
        </form>

        <div className={styles.footer}>
          <p>© 2023 Astro Oracles. All cosmic rights reserved.</p>
          <p>
            <a href="#terms">Terms of Service</a> | <a href="#privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}