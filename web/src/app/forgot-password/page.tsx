'use client';

import { useState } from 'react';
import styles from './ForgotPassword.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi proses pengiriman email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form setelah 5 detik
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      {/* Background Elements */}
      <div className={styles.cosmicBackground}></div>
      <div className={styles.nebulaEffect}></div>
      <div className={styles.floatingStars}></div>
      <div className={styles.floatingStars2}></div>
      
      <div className={styles.contentWrapper}>
        {/* Navigation Back */}
        <button 
          className={styles.backButton}
          onClick={handleBackToLogin}
        >
          ← Kembali ke Login
        </button>

        {/* Main Card */}
        <div className={styles.passwordCard}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <div className={styles.cosmicOrb}>
              <div className={styles.orbCore}></div>
              <div className={styles.orbRing}></div>
              <div className={styles.orbParticles}>
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className={styles.particle}
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-40px)`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <h1 className={styles.mainTitle}>Reset Password</h1>
            <p className={styles.subtitle}>
              Masukkan email Anda untuk menerima tautan reset password
            </p>
          </div>

            {/* Conditional Rendering */}
          {!isSubmitted ? (
            <form className={styles.formSection} onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>
                  Email Address
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    id="email"
                    className={styles.emailInput}
                    placeholder="your.cosmic@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className={styles.inputIcon}>✉️</div>
                </div>
                <p className={styles.inputHint}>
                  Kami akan mengirim tautan reset ke email Anda
                </p>
              </div>

               {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <span className={styles.loadingSpinner}></span>
                    Mengirim Tautan...
                  </>
                ) : (
                  'Kirim Tautan Reset'
                )}
              </button>

              
              {/* Alternative Options */}
              <div className={styles.alternativeOptions}>
                <p className={styles.alternativeText}>
                  Lupa email Anda?{' '}
                  <button 
                    type="button"
                    className={styles.alternativeLink}
                    onClick={() => console.log('Contact support clicked')}
                  >
                    Hubungi Dukungan
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <SuccessMessage email={email} onBack={handleBackToLogin} />
          )}

                    {/* Cosmic Guidance */}
          <div className={styles.guidanceSection}>
            <div className={styles.guidanceIcon}>🔮</div>
            <p className={styles.guidanceText}>
              <strong>Panduan Kosmik:</strong> Periksa folder spam jika Anda tidak menerima email dalam 5 menit
            </p>
          </div>
        </div>

               {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2023 Astro Oracles • Password Recovery</p>
          <p className={styles.securityNote}>
            ⚡ Tautan reset akan kedaluwarsa dalam 1 jam untuk keamanan
          </p>
        </footer>
      </div>
    </div>
  );
}

// Success Message Component
function SuccessMessage({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <div className={styles.successSection}>
      <div className={styles.successIcon}>✨</div>
      <h2 className={styles.successTitle}>Tautan Telah Dikirim!</h2>
      <p className={styles.successMessage}>
        Kami telah mengirim tautan reset password ke{' '}
        <span className={styles.emailHighlight}>{email}</span>
      </p>
      
      <div className={styles.successInstructions}>
        <h3>Langkah selanjutnya:</h3>
        <ol className={styles.instructionsList}>
          <li>Periksa inbox email Anda</li>
          <li>Klik tautan reset password</li>
          <li>Buat password baru yang kuat</li>
          <li>Login dengan password baru</li>
        </ol>
      </div>

      <div className={styles.successActions}>
        <button 
          className={styles.resendButton}
          onClick={() => console.log('Resend email clicked')}
        >
          Kirim Ulang Email
        </button>
        <button 
          className={styles.backToLoginButton}
          onClick={onBack}
        >
          Kembali ke Login
        </button>
      </div>

      <div className={styles.checkPromo}>
        <p>
          <strong>Tips:</strong> Gunakan kombinasi simbol, angka, dan huruf besar/kecil untuk password yang lebih aman
        </p>
      </div>
    </div>
  );
}