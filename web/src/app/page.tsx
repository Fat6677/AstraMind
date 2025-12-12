'use client'; // Komponen ini interaktif dan menggunakan state

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ZodiacSelector from './components/ZodiacSelector';
import HoroscopeCard from './components/HoroscopeCard';

interface HoroscopeData {
  sign: string;
  horoscope: string;
}


export default function HomePage() {
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   const handleGenerateHoroscope = async (sign: string) => {
    setIsLoading(true);
    setError(null);
    setHoroscope(null);

    try {
      const response = await fetch('/api/generate-horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },