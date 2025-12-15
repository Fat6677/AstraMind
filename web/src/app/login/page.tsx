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

      const handleToForgetPassword = () => {
        window.location.href = '/forgot-password';
    };

  return (
    <div className={styles.astroLoginContainer}>
      <div className={styles.starsBackground}></div>
      <div className={`${styles.starsBackground} ${styles.starsBackgroundTwo}`}></div>
      
      <div className={styles.astroLoginCard}>
        <div className={styles.logoContainer}>
          <div className={styles.astroLogoPlaceholder}>
            <div className={styles.planet}></div>
            <div className={styles.orbit}></div>
            <div className={styles.starsSmall}></div>
            <div className={`${styles.starsSmall} ${styles.starsSmallTwo}`}></div>
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
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkboxInput}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className={styles.forgotLink} onClick={handleToForgetPassword}>
              Forgot password?
            </a>
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
              <button 
                type="button" 
                className={`${styles.socialButton} ${styles.googleButton}`}
                onClick={() => console.log('Google login clicked')}
              >
                <div className={styles.socialIcon}></div>
                Google
              </button>
              
              <button 
                type="button" 
                className={`${styles.socialButton} ${styles.facebookButton}`}
                onClick={() => console.log('Facebook login clicked')}
              >
                <div className={styles.socialIcon}></div>
                Facebook
              </button>
              
              <button 
                type="button" 
                className={`${styles.socialButton} ${styles.twitterButton}`}
                onClick={() => console.log('Twitter login clicked')}
              >
                <div className={styles.socialIcon}></div>
                Twitter
              </button>
            </div>
          </div>

          <p className={styles.signupLink}>
            Don&apos;t have a cosmic account?{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Sign up now
            </a>
          </p>
        </form>

        <div className={styles.footer}>
          <p>© 2025 Astro Oracles. All cosmic rights reserved.</p>
          <p>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            {' | '}
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}