// src/app/signup/success/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Success.module.css';

// Define user data type
interface UserData {
  username: string;
  email: string;
  zodiac: string;
  // Add other fields as needed
}

export default function SignUpSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Single useEffect untuk semua initialization
  useEffect(() => {
    // Function untuk handle mounting dan data fetching
    const initialize = () => {
      // Get data from localStorage
      const storedData = localStorage.getItem('astro_user_temp');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as UserData;
          setUserData(parsedData);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      // Set mounted flag setelah semua async operations selesai
      setTimeout(() => {
        setHasMounted(true);
        setIsLoading(false);
      }, 0);
    };

    initialize();

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []); // Empty dependency array untuk effect sekali jalan

  // Second useEffect: Handle countdown - HANYA setelah mounted
  useEffect(() => {
    if (!hasMounted) return;

    // Start countdown
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          // Gunakan setTimeout untuk delay redirect
          setTimeout(() => {
            router.push('/login');
          }, 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [hasMounted, router]);

  // Third useEffect: Clear localStorage setelah data diambil
  useEffect(() => {
    if (userData && hasMounted) {
      // Clear localStorage after a delay
      const clearTimer = setTimeout(() => {
        localStorage.removeItem('astro_user_temp');
      }, 1000);
      
      return () => clearTimeout(clearTimer);
    }
  }, [userData, hasMounted]);

  const handleGoToLogin = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    router.push('/login');
  };

  const handleExplore = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    router.push('/compatibility');
  };

  // Loading state
  if (isLoading || !hasMounted) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Memuat...</p>
      </div>
    );
  }

  // Main render
  return (
    <div className={styles.successContainer}>
      {/* Background Elements */}
      <div className={styles.cosmicBackground}></div>
      <div className={styles.successStars}></div>
      <div className={styles.confetti}></div>
      
      {/* Success Animation */}
      <div className={styles.successAnimation}>
        <div className={styles.successOrbit}></div>
        <div className={styles.successCore}></div>
        <div className={styles.successParticles}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className={styles.particle}
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.successCard}>
          {/* Success Icon */}
          <div className={styles.successIcon}>✨</div>
          
          {/* Success Message */}
          <h1 className={styles.successTitle}>Selamat Bergabung!</h1>
          <p className={styles.successMessage}>
            Akun Anda berhasil dibuat. Perjalanan kosmik Anda dimulai sekarang.
          </p>
          
          {/* User Info */}
          {userData && (
            <div className={styles.userInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Username:</span>
                <span className={styles.infoValue}>{userData.username}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email:</span>
                <span className={styles.infoValue}>{userData.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Zodiak:</span>
                <span className={styles.infoValue}>{userData.zodiac}</span>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className={styles.nextSteps}>
            <h3 className={styles.stepsTitle}>Langkah Selanjutnya</h3>
            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <h4>Verifikasi Email</h4>
                <p>Periksa inbox email Anda untuk tautan verifikasi</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <h4>Lengkapi Profil</h4>
                <p>Tambah detail untuk ramalan yang lebih personal</p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <h4>Mulai Eksplorasi</h4>
                <p>Coba fitur Compatibility Checker</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleGoToLogin}
            >
              Lanjut ke Login {countdown > 0 && `(${countdown})`}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleExplore}
            >
              Jelajahi Fitur
            </button>
          </div>

          {/* Welcome Gift */}
          <div className={styles.welcomeGift}>
            <div className={styles.giftIcon}>🎁</div>
            <p>
              <strong>Bonus:</strong> Anda mendapat akses 7 hari premium gratis!
              Nikmati fitur eksklusif tanpa batas.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2023 Astro Oracles • Welcome to the Cosmic Community</p>
          <p className={styles.supportText}>
            Butuh bantuan?{' '}
            <button 
              type="button"
              className={styles.supportLink}
              onClick={() => console.log('Support clicked')}
            >
              Hubungi Dukungan
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
}