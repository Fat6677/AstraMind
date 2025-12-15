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
    } catch (err: unknown) {
      setError((err as Error).message);
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

      <main className="flex-grow">
        {/* Hero Section dengan Gradien */}
        <div className="bg-gradient-to-br from-purple-100 via-white to-indigo-100">
          <div className="container mx-auto px-6 pt-24 pb-12">
            {/* Konten Utama (Sekarang Mengambil Lebar Penuh) */}
            <section className="flex flex-col items-center justify-center text-center">
              {!horoscope && !isLoading && (
                <>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    Temukan Jalan Anda <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Hari Ini</span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-xl">
                    Pilih zodiak Kamu dan dapatkan wawasan unik dari AstraMind, asisten ramalan harian anda
                  </p>
                </>
              )}

              {error && <p className="text-red-500 mb-4">{error}</p>}
              {isLoading && <p className="text-lg text-gray-500">Sedang berkomunikasi dengan kosmos...</p>}
              {!horoscope && !isLoading && <ZodiacSelector onSignSelect={handleGenerateHoroscope} isLoading={isLoading} />}
              {horoscope && <HoroscopeCard sign={horoscope.sign} text={horoscope.horoscope} onReset={handleReset} />}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}