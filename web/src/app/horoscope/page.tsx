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

  