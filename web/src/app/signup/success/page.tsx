'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Success.module.css';

export default function SignUpSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Ambil data dari localStorage
    const storedData = localStorage.getItem('astro_user_temp');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      localStorage.removeItem('astro_user_temp');
    }

        // Countdown untuk redirect
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleExplore = () => {
    router.push('/compatibility');
  };

      // Countdown untuk redirect
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleExplore = () => {
    router.push('/compatibility');
  };

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
              className={styles.primaryButton}
              onClick={handleGoToLogin}
            >
              Lanjut ke Login ({countdown})
            </button>
            <button
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