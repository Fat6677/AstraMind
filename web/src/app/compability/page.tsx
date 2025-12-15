// src/app/compatibility/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Heart, Star, Sparkles, Moon, Sun,
  ChevronRight, Share2, Bookmark
} from 'lucide-react';
import styles from './Compatibility.module.css';

// Data zodiak dengan karakteristik
const zodiacSigns = [
  { id: 1, name: 'Aries', date: 'Mar 21 - Apr 19', element: 'Fire', symbol: '♈', color: '#FF6B6B' },
  { id: 2, name: 'Taurus', date: 'Apr 20 - May 20', element: 'Earth', symbol: '♉', color: '#4ECDC4' },
  { id: 3, name: 'Gemini', date: 'May 21 - Jun 20', element: 'Air', symbol: '♊', color: '#45B7D1' },
  { id: 4, name: 'Cancer', date: 'Jun 21 - Jul 22', element: 'Water', symbol: '♋', color: '#96CEB4' },
  { id: 5, name: 'Leo', date: 'Jul 23 - Aug 22', element: 'Fire', symbol: '♌', color: '#FFEAA7' },
  { id: 6, name: 'Virgo', date: 'Aug 23 - Sep 22', element: 'Earth', symbol: '♍', color: '#DDA15E' },
  { id: 7, name: 'Libra', date: 'Sep 23 - Oct 22', element: 'Air', symbol: '♎', color: '#BC6C25' },
  { id: 8, name: 'Scorpio', date: 'Oct 23 - Nov 21', element: 'Water', symbol: '♏', color: '#E76F51' },
  { id: 9, name: 'Sagittarius', date: 'Nov 22 - Dec 21', element: 'Fire', symbol: '♐', color: '#2A9D8F' },
  { id: 10, name: 'Capricorn', date: 'Dec 22 - Jan 19', element: 'Earth', symbol: '♑', color: '#264653' },
  { id: 11, name: 'Aquarius', date: 'Jan 20 - Feb 18', element: 'Air', symbol: '♒', color: '#E9C46A' },
  { id: 12, name: 'Pisces', date: 'Feb 19 - Mar 20', element: 'Water', symbol: '♓', color: '#F4A261' },
];

// Data hasil kecocokan emosional
const compatibilityResults = {
  high: [
    "Koneksi yang Menguatkan",
    "Harmoni Batin yang Dalam",
    "Soulmate Energi",
    "Pertumbuhan Bersama"
  ],
  medium: [
    "Dinamika yang Menarik",
    "Belajar dan Berkembang",
    "Keseimbangan yang Unik",
    "Perjalanan Bersama"
  ],
  low: [
    "Tantangan yang Memperkaya",
    "Cermin untuk Bertumbuh",
    "Peluang Transformasi",
    "Kedewasaan Emosional"
  ]
};

export default function CompatibilityPage() {
  const [selectedSign1, setSelectedSign1] = useState<number | null>(null);
  const [selectedSign2, setSelectedSign2] = useState<number | null>(null);
  const [compatibilityResult, setCompatibilityResult] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationStage, setAnimationStage] = useState<'idle' | 'connecting' | 'revealing'>('idle');

  const starPositions = useMemo(() => {
    return [...Array(50)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.7
    }));
  }, []);

  const calculateCompatibility = () => {
    if (!selectedSign1 || !selectedSign2) return;
    
    setIsLoading(true);
    setAnimationStage('connecting');
    
    // Simulasi koneksi ke API
    setTimeout(() => {
      const sign1 = zodiacSigns.find(s => s.id === selectedSign1);
      const sign2 = zodiacSigns.find(s => s.id === selectedSign2);
      
      if (!sign1 || !sign2) return;
      
      // Logika perhitungan sederhana
      let score = 50;
      
      // Elemen yang sama = +20
      if (sign1.element === sign2.element) score += 20;
      
      // Elemen yang kompatibel (Fire-Air, Earth-Water) = +10
      const compatibleElements = [
        ['Fire', 'Air'],
        ['Earth', 'Water'],
        ['Air', 'Fire'],
        ['Water', 'Earth']
      ];
      if (compatibleElements.some(([a, b]) => 
        (a === sign1.element && b === sign2.element) || 
        (a === sign2.element && b === sign1.element)
      )) score += 10;
      
      // Variasi acak untuk simulasi
      score += Math.floor(Math.random() * 20) - 10;
      score = Math.max(30, Math.min(score, 95));
      
      const resultLevel = score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low';
      const resultTitle = compatibilityResults[resultLevel][Math.floor(Math.random() * compatibilityResults[resultLevel].length)];
      
      const result = {
        score,
        level: resultLevel,
        title: resultTitle,
        sign1,
        sign2,
        strengths: [
          "Kemampuan komunikasi yang baik",
          "Pemahaman emosional yang mendalam",
          "Keselarasan dalam nilai-nilai hidup",
          "Dukungan mutual dalam pertumbuhan"
        ],
        challenges: [
          "Perbedaan dalam mengekspresikan perasaan",
          "Tantangan dalam manajemen konflik",
          "Kebutuhan akan ruang personal",
          "Penyesuaian ritme hidup"
        ],
        advice: "Fokus pada membangun kepercayaan dan komunikasi terbuka. Ingatlah bahwa setiap hubungan adalah perjalanan unik yang membutuhkan kesabaran dan pemahaman."
      };
      
      setCompatibilityResult(result);
      setAnimationStage('revealing');
      setIsLoading(false);
      
      // Simpan ke history
      saveToHistory(result);
    }, 1500);
  };

  const saveToHistory = (result: unknown) => {
    const history = JSON.parse(localStorage.getItem('compatibilityHistory') || '[]');
    history.unshift({
      result,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    
    if (history.length > 10) history.pop();
    localStorage.setItem('compatibilityHistory', JSON.stringify(history));
  };

  const shareResult = () => {
    if (!compatibilityResult) return;
    
    const text = `Kecocokan ${compatibilityResult.sign1.name} & ${compatibilityResult.sign2.name}: ${compatibilityResult.score}% - ${compatibilityResult.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Hasil Astro Compatibility',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Hasil telah disalin ke clipboard!');
    }
  };

  const getSignColor = (signId: number) => {
    const sign = zodiacSigns.find(s => s.id === signId);
    return sign?.color || '#8B5CF6';
  };

  return (
    <div className={styles.container}>
      {/* Background Nebula */}
      <div className={styles.nebulaBackground}></div>
      <div className={styles.nebulaOverlay}></div>
      
      {/* Bintang-bintang animasi */}
      <div className={styles.starsContainer}>
        {starPositions.map((position, i) => (
          <div 
            key={i} 
            className={styles.star}
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
              animationDelay: `${position.delay}s`,
              opacity: position.opacity
            }}
          />
        ))}
      </div>

      <main className={styles.mainContent}>
        {/* Header */}
        <motion.header 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>
            <Sparkles className={styles.sparkleIcon} />
            Compatibility Checker
            <Sparkles className={styles.sparkleIcon} />
          </h1>
          <p className={styles.subtitle}>
            Jelajahi kedalaman koneksi emosional dan energi antara dua jiwa
          </p>
        </motion.header>

        {/* Zodiac Selection Panels */}
        <div className={styles.selectionContainer}>
          {/* Panel Zodiak 1 */}
          <motion.div 
            className={styles.zodiacPanel}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              borderColor: selectedSign1 ? getSignColor(selectedSign1) : 'transparent',
              boxShadow: selectedSign1 ? `0 0 30px ${getSignColor(selectedSign1)}40` : 'none'
            }}
          >
            <div className={styles.panelHeader}>
              <Sun className={styles.panelIcon} />
              <h2 className={styles.panelTitle}>Individu Pertama</h2>
            </div>
            
            <div className={styles.zodiacGrid}>
              {zodiacSigns.map((sign) => (
                <motion.button
                  key={sign.id}
                  className={`${styles.zodiacOption} ${selectedSign1 === sign.id ? styles.selected : ''}`}
                  onClick={() => setSelectedSign1(sign.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    '--sign-color': sign.color
                  } as React.CSSProperties}
                >
                  <span className={styles.zodiacSymbol}>{sign.symbol}</span>
                  <span className={styles.zodiacName}>{sign.name}</span>
                  <span className={styles.zodiacDate}>{sign.date}</span>
                </motion.button>
              ))}
            </div>
            
            {selectedSign1 && (
              <motion.div 
                className={styles.selectedSignInfo}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <div className={styles.signDetails}>
                  <span className={styles.selectedSymbol}>
                    {zodiacSigns.find(s => s.id === selectedSign1)?.symbol}
                  </span>
                  <div>
                    <h3>{zodiacSigns.find(s => s.id === selectedSign1)?.name}</h3>
                    <p>Elemen: {zodiacSigns.find(s => s.id === selectedSign1)?.element}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Connection Animation */}
          <div className={styles.connectionCenter}>
            <motion.div 
              className={styles.connectionOrbit}
              animate={animationStage === 'connecting' ? {
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              } : {}}
              transition={{
                duration: 2,
                repeat: animationStage === 'connecting' ? Infinity : 0,
                ease: "linear"
              }}
            />
            
            <motion.div 
              className={styles.connectionCore}
              animate={{
                scale: animationStage === 'connecting' ? [1, 1.3, 1] : 1,
                opacity: animationStage === 'connecting' ? [0.7, 1, 0.7] : 0.7
              }}
              transition={{
                duration: 1.5,
                repeat: animationStage === 'connecting' ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <Heart className={styles.heartIcon} />
            </motion.div>
            
            {/* Energy Beams */}
            {selectedSign1 && selectedSign2 && (
              <>
                <motion.div 
                  className={styles.energyBeam}
                  style={{
                    '--beam-color': getSignColor(selectedSign1)
                  } as React.CSSProperties}
                  animate={animationStage === 'connecting' ? {
                    width: ['0%', '100%', '0%'],
                    opacity: [0, 0.8, 0]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: animationStage === 'connecting' ? Infinity : 0
                  }}
                />
                <motion.div 
                  className={styles.energyBeam}
                  style={{
                    '--beam-color': getSignColor(selectedSign2),
                    transform: 'rotate(180deg)'
                  } as React.CSSProperties}
                  animate={animationStage === 'connecting' ? {
                    width: ['0%', '100%', '0%'],
                    opacity: [0, 0.8, 0]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: animationStage === 'connecting' ? Infinity : 0,
                    delay: 0.3
                  }}
                />
              </>
            )}
          </div>

          {/* Panel Zodiak 2 */}
          <motion.div 
            className={styles.zodiacPanel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              borderColor: selectedSign2 ? getSignColor(selectedSign2) : 'transparent',
              boxShadow: selectedSign2 ? `0 0 30px ${getSignColor(selectedSign2)}40` : 'none'
            }}
          >
            <div className={styles.panelHeader}>
              <Moon className={styles.panelIcon} />
              <h2 className={styles.panelTitle}>Individu Kedua</h2>
            </div>
            
            <div className={styles.zodiacGrid}>
              {zodiacSigns.map((sign) => (
                <motion.button
                  key={sign.id}
                  className={`${styles.zodiacOption} ${selectedSign2 === sign.id ? styles.selected : ''}`}
                  onClick={() => setSelectedSign2(sign.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    '--sign-color': sign.color
                  } as React.CSSProperties}
                >
                  <span className={styles.zodiacSymbol}>{sign.symbol}</span>
                  <span className={styles.zodiacName}>{sign.name}</span>
                  <span className={styles.zodiacDate}>{sign.date}</span>
                </motion.button>
              ))}
            </div>
            
            {selectedSign2 && (
              <motion.div 
                className={styles.selectedSignInfo}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <div className={styles.signDetails}>
                  <span className={styles.selectedSymbol}>
                    {zodiacSigns.find(s => s.id === selectedSign2)?.symbol}
                  </span>
                  <div>
                    <h3>{zodiacSigns.find(s => s.id === selectedSign2)?.name}</h3>
                    <p>Elemen: {zodiacSigns.find(s => s.id === selectedSign2)?.element}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Main Action Button */}
        <motion.div 
          className={styles.actionContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className={styles.checkButton}
            onClick={calculateCompatibility}
            disabled={!selectedSign1 || !selectedSign2 || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isLoading ? {
              boxShadow: [
                '0 0 20px rgba(139, 92, 246, 0.5)',
                '0 0 40px rgba(139, 92, 246, 0.8)',
                '0 0 20px rgba(139, 92, 246, 0.5)'
              ]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: isLoading ? Infinity : 0
            }}
          >
            {isLoading ? (
              <>
                <motion.div 
                  className={styles.spinner}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Menghubungkan Energi...
              </>
            ) : (
              <>
                <Zap className={styles.buttonIcon} />
                Lihat Kecocokan
                <ChevronRight className={styles.buttonIcon} />
              </>
            )}
          </motion.button>
          
          <p className={styles.buttonHint}>
            Pilih kedua zodiak untuk membuka rahasia koneksi di antara mereka
          </p>
        </motion.div>

        {/* Results Card */}
        <AnimatePresence>
          {compatibilityResult && (
            <motion.div 
              className={styles.resultCard}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className={styles.resultHeader}>
                <div className={styles.compatibilityScore}>
                  <motion.div 
                    className={styles.scoreCircle}
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * compatibilityResult.score / 100) }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        stroke="rgba(255,255,255,0.1)" 
                        strokeWidth="4" 
                        fill="none"
                      />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        stroke="url(#gradient)" 
                        strokeWidth="4" 
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="283"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={getSignColor(selectedSign1!)} />
                          <stop offset="100%" stopColor={getSignColor(selectedSign2!)} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                  <div className={styles.scoreText}>
                    <span className={styles.scorePercentage}>{compatibilityResult.score}%</span>
                    <span className={styles.scoreLabel}>Kecocokan</span>
                  </div>
                </div>
                
                <div className={styles.resultTitleContainer}>
                  <h3 className={styles.resultTitle}>{compatibilityResult.title}</h3>
                  <p className={styles.resultSubtitle}>
                    {compatibilityResult.sign1.name} & {compatibilityResult.sign2.name}
                  </p>
                </div>
              </div>

              <div className={styles.resultContent}>
                <div className={styles.resultSection}>
                  <h4 className={styles.sectionTitle}>
                    <Star className={styles.sectionIcon} />
                    Kekuatan Hubungan
                  </h4>
                  <ul className={styles.strengthsList}>
                    {compatibilityResult.strengths.map((strength: string, idx: number) => (
                      <li key={idx} className={styles.strengthItem}>
                        <div className={styles.strengthBullet} />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.resultSection}>
                  <h4 className={styles.sectionTitle}>
                    <Zap className={styles.sectionIcon} />
                    Area untuk Bertumbuh
                  </h4>
                  <ul className={styles.challengesList}>
                    {compatibilityResult.challenges.map((challenge: string, idx: number) => (
                      <li key={idx} className={styles.challengeItem}>
                        <div className={styles.challengeBullet} />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.resultSection}>
                  <h4 className={styles.sectionTitle}>
                    <Sparkles className={styles.sectionIcon} />
                    Pesan dari Bintang
                  </h4>
                  <p className={styles.adviceText}>{compatibilityResult.advice}</p>
                </div>
              </div>

              <div className={styles.resultActions}>
                <motion.button 
                  className={styles.shareButton}
                  onClick={shareResult}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className={styles.actionIcon} />
                  Bagikan Hasil
                </motion.button>
                
                <motion.button 
                  className={styles.saveButton}
                  onClick={() => alert('Disimpan untuk dibaca nanti!')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bookmark className={styles.actionIcon} />
                  Simpan
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Note */}
        <motion.footer 
          className={styles.footerNote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>
            Compatibility Checker adalah alat untuk refleksi dan pemahaman diri. 
            Hasil yang diberikan bertujuan untuk membuka percakapan, bukan sebagai keputusan mutlak.
            Setiap hubungan adalah perjalanan unik yang membutuhkan cinta, usaha, dan pemahaman.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}