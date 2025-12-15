// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignUp.module.css';

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  zodiac: string;
  agreeTerms: boolean;
  newsletter: boolean;
};

type ZodiacOption = {
  value: string;
  label: string;
  symbol: string;
  element: string;
  dates: string;
};

const zodiacOptions: ZodiacOption[] = [
  { value: 'aries', label: 'Aries', symbol: '♈', element: 'Fire', dates: 'Mar 21 - Apr 19' },
  { value: 'taurus', label: 'Taurus', symbol: '♉', element: 'Earth', dates: 'Apr 20 - May 20' },
  { value: 'gemini', label: 'Gemini', symbol: '♊', element: 'Air', dates: 'May 21 - Jun 20' },
  { value: 'cancer', label: 'Cancer', symbol: '♋', element: 'Water', dates: 'Jun 21 - Jul 22' },
  { value: 'leo', label: 'Leo', symbol: '♌', element: 'Fire', dates: 'Jul 23 - Aug 22' },
  { value: 'virgo', label: 'Virgo', symbol: '♍', element: 'Earth', dates: 'Aug 23 - Sep 22' },
  { value: 'libra', label: 'Libra', symbol: '♎', element: 'Air', dates: 'Sep 23 - Oct 22' },
  { value: 'scorpio', label: 'Scorpio', symbol: '♏', element: 'Water', dates: 'Oct 23 - Nov 21' },
  { value: 'sagittarius', label: 'Sagittarius', symbol: '♐', element: 'Fire', dates: 'Nov 22 - Dec 21' },
  { value: 'capricorn', label: 'Capricorn', symbol: '♑', element: 'Earth', dates: 'Dec 22 - Jan 19' },
  { value: 'aquarius', label: 'Aquarius', symbol: '♒', element: 'Air', dates: 'Jan 20 - Feb 18' },
  { value: 'pisces', label: 'Pisces', symbol: '♓', element: 'Water', dates: 'Feb 19 - Mar 20' },
];

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    zodiac: '',
    agreeTerms: false,
    newsletter: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState<'basic' | 'zodiac'>('basic');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

 const handleInputChange = (field: keyof SignUpFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));

    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value as string));
    }
  };

   const validateForm = (): boolean => {
    const newErrors: Partial<SignUpFormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username diperlukan';
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Tanggal lahir diperlukan';
    }

    if (!formData.zodiac) {
      newErrors.zodiac = 'Pilih zodiak Anda';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };