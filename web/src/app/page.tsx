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


export default function HeaderWithLogo() {
  return (  
    <>

      <ZodiacSelector/>
      <Header />
      <Footer />
    </>
    );
}
