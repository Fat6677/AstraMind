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
         body: JSON.stringify({ sign }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan ramalan.');
      }

      const data: HoroscopeData = await response.json();
      setHoroscope(data);
      } catch (err: any) {
      setError(err.message);
      } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setHoroscope(null);
    setError(null);
  };

   return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        {!horoscope && !isLoading && (
          <>
          <h2 className="text-4xl font-bold text-center mb-2">Temukan Jalan Anda Hari Ini</h2>
            <p className="text-lg text-gray-600 text-center mb-8">Pilih zodiak Anda dan dapatkan wawasan unik dari Astro AI.</p>
          </>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading && <p className="text-lg text-gray-500">Sedang berkomunikasi dengan kosmos...</p>}
        {!horoscope && !isLoading && <ZodiacSelector onSignSelect={handleGenerateHoroscope} isLoading={isLoading} />}

        {horoscope && <HoroscopeCard sign={horoscope.sign} text={horoscope.horoscope} onReset={handleReset} />}
      </main>

       <Footer />
    </div>
  );
}