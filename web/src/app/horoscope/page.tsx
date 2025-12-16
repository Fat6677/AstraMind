'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';

// Feature type definition
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  path: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export default function HomePage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Features data
  const features: Feature[] = [
    {
      id: 1,
      title: 'Compatibility Checker',
      description: 'Cek kecocokan hubungan dengan analisis zodiak mendalam',
      icon: '💫',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
      path: '/compatibility',
      isPopular: true
    },
    {
      id: 2,
      title: 'Daily Horoscope',
      description: 'Ramalan harian personal berdasarkan zodiak Anda',
      icon: '🔮',
      color: '#EC4899',
      gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
      path: '/horoscope',
      isNew: true
    },
    {
      id: 3,
      title: 'Zodiac Insights',
      description: 'Eksplorasi mendalam tentang semua 12 zodiak',
      icon: '♋',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
      path: '/zodiac'
    },
    {
      id: 4,
      title: 'Birth Chart',
      description: 'Analisis chart kelahiran untuk takdir hidup Anda',
      icon: '🌌',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      path: '/birth-chart'
    },
    {
      id: 5,
      title: 'Love Forecast',
      description: 'Prediksi asmara dan hubungan romantis',
      icon: '💖',
      color: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
      path: '/love'
    },
    {
      id: 6,
      title: 'Career Guidance',
      description: 'Panduan karir berdasarkan astrologi',
      icon: '💼',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
      path: '/career'
    }
  ];


  // Zodiac signs for the carousel
  const zodiacSigns = [
    { symbol: '♈', name: 'Aries', date: 'Mar 21 - Apr 19' },
    { symbol: '♉', name: 'Taurus', date: 'Apr 20 - May 20' },
    { symbol: '♊', name: 'Gemini', date: 'May 21 - Jun 20' },
    { symbol: '♋', name: 'Cancer', date: 'Jun 21 - Jul 22' },
    { symbol: '♌', name: 'Leo', date: 'Jul 23 - Aug 22' },
    { symbol: '♍', name: 'Virgo', date: 'Aug 23 - Sep 22' },
    { symbol: '♎', name: 'Libra', date: 'Sep 23 - Oct 22' },
    { symbol: '♏', name: 'Scorpio', date: 'Oct 23 - Nov 21' },
    { symbol: '♐', name: 'Sagittarius', date: 'Nov 22 - Dec 21' },
    { symbol: '♑', name: 'Capricorn', date: 'Dec 22 - Jan 19' },
    { symbol: '♒', name: 'Aquarius', date: 'Jan 20 - Feb 18' },
    { symbol: '♓', name: 'Pisces', date: 'Feb 19 - Mar 20' }
  ];

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle feature click
  const handleFeatureClick = (path: string) => {
    router.push(path);
  };

  // Handle login/signup
  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  // Scroll to features
  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.homeContainer}>
      {/* Background Elements */}
      <div className={styles.cosmicBackground}></div>
      <div className={styles.nebulaOverlay}></div>
      <div className={styles.floatingStars}></div>
      <div className={styles.floatingPlanets}>
        <div className={styles.planet}></div>
        <div className={styles.planet2}></div>
        <div className={styles.planet3}></div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>
          <div className={styles.logoOrb}>
            <div className={styles.orbCore}></div>
            <div className={styles.orbRing}></div>
          </div>
          <span className={styles.logoText}>ASTRO ORACLES</span>
        </div>

        <div className={styles.navButtons}>
          <button 
            className={styles.navButton}
            onClick={() => router.push('/about')}
          >
            Tentang Kami
          </button>
          <button 
            className={styles.navButton}
            onClick={scrollToFeatures}
          >
            Fitur
          </button>
          <button 
            className={styles.navButton}
            onClick={() => router.push('/pricing')}
          >
            Premium
          </button>
          <button 
            className={styles.loginButton}
            onClick={handleLogin}
          >
            Masuk
          </button>
          <button 
            className={styles.signupButton}
            onClick={handleSignUp}
          >
            Daftar Gratis
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeText}>✨ Portal Kosmik Terbuka</span>
          </div>

          <h1 className={styles.heroTitle}>
            Temukan Takdir Anda di{' '}
            <span className={styles.titleHighlight}>Dunia Astrologi</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Jelajahi rahasia bintang, pahami hubungan, dan temukan potensi terbaik Anda 
            dengan panduan astrologi yang personal dan akurat.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Pengguna Aktif</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>12</div>
              <div className={styles.statLabel}>Zodiak Lengkap</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>Kepuasan</div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <button 
              className={styles.primaryAction}
              onClick={handleSignUp}
            >
              Mulai Perjalanan Kosmik
            </button>
            <button 
              className={styles.secondaryAction}
              onClick={scrollToFeatures}
            >
              Jelajahi Fitur
              <span className={styles.actionArrow}>→</span>
            </button>
          </div>

          {/* Current Time Display */}
          <div className={styles.timeDisplay}>
            <div className={styles.timeIcon}>🕒</div>
            <div className={styles.timeContent}>
              <div className={styles.timeLabel}>Waktu Kosmik Saat Ini</div>
              <div className={styles.timeValue}>{currentTime}</div>
            </div>
          </div>
        </div>

        {/* Zodiac Carousel */}
        <div className={styles.zodiacCarousel}>
          <div className={styles.carouselTrack}>
            {[...zodiacSigns, ...zodiacSigns].map((sign, index) => (
              <div 
                key={index} 
                className={styles.zodiacCard}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className={styles.zodiacSymbol}>{sign.symbol}</div>
                <div className={styles.zodiacName}>{sign.name}</div>
                <div className={styles.zodiacDate}>{sign.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>🌟</div>
          <h2 className={styles.sectionTitle}>Fitur Eksklusif Kami</h2>
          <p className={styles.sectionSubtitle}>
            Temukan berbagai alat astrologi untuk membantu perjalanan spiritual Anda
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${styles.featureCard} ${
                activeFeature === feature.id ? styles.featureActive : ''
              }`}
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
              onClick={() => handleFeatureClick(feature.path)}
              style={{
                '--feature-color': feature.color,
                '--feature-gradient': feature.gradient,
              } as React.CSSProperties}
            >
              {feature.isNew && (
                <div className={styles.newBadge}>BARU</div>
              )}
              {feature.isPopular && (
                <div className={styles.popularBadge}>POPULAR</div>
              )}

              <div className={styles.featureIcon}>{feature.icon}</div>
              
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>

              <div className={styles.featureActions}>
                <button className={styles.exploreButton}>
                  Jelajahi
                  <span className={styles.exploreArrow}>→</span>
                </button>
              </div>

              <div className={styles.featureGlow}></div>
            </div>
          ))}
        </div>
      </section>

