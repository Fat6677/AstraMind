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
