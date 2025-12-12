
import React, { use } from "react";
import Link from "next/link";
import Header from './components/Header';
import Footer from './components/Footer';
import ZodiacSelector from './components/ZodiacSelector';



export default function HeaderWithLogo() {
  return (  
    <>
      <ZodiacSelector/>
      <Header />
      <Footer />
    </>
    );
}
