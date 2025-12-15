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

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  birthDate?: string;
  zodiac?: string;
  agreeTerms?: string;
}

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
  const [errors, setErrors] = useState<FormErrors>({});

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
    const newErrors: FormErrors = {};

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

    const handleNextStep = () => {
    if (formStep === 'basic') {
      const basicFields = ['username', 'email', 'password', 'confirmPassword', 'birthDate'];
      const hasError = basicFields.some(field => !formData[field as keyof SignUpFormData]);
      
      if (!hasError) {
        setFormStep('zodiac');
      } else {
        alert('Lengkapi semua field terlebih dahulu');
      }
    }
  };

   const handlePreviousStep = () => {
    setFormStep('basic');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simpan data ke localStorage (simulasi)
      localStorage.setItem('astro_user_temp', JSON.stringify(formData));
      
      // Redirect ke success page
      router.push('/signup/success');
    }, 2000);
  };

    const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className={styles.signUpContainer}>
      {/* Background Elements */}
      <div className={styles.cosmicBackground}></div>
      <div className={styles.nebulaEffect}></div>
      <div className={styles.floatingStars}></div>
      <div className={styles.floatingConstellations}></div>
      
      {/* Decorative Planets */}
      <div className={styles.planetOne}></div>
      <div className={styles.planetTwo}></div>
      <div className={styles.planetThree}></div>

      <div className={styles.contentWrapper}>
        {/* Navigation */}
        <div className={styles.navigation}>
          <button 
            className={styles.backButton}
            onClick={handleLoginRedirect}
          >
            ← Sudah punya akun? Login
          </button>
          <div className={styles.stepsIndicator}>
            <div className={`${styles.step} ${formStep === 'basic' ? styles.active : ''}`}>
              <div className={styles.stepNumber}>1</div>
              <span className={styles.stepLabel}>Data Dasar</span>
            </div>
            <div className={styles.stepLine}></div>
            <div className={`${styles.step} ${formStep === 'zodiac' ? styles.active : ''}`}>
              <div className={styles.stepNumber}>2</div>
              <span className={styles.stepLabel}>Profil Kosmik</span>
            </div>
          </div>
        </div>

               {/* Main Card */}
        <div className={styles.signUpCard}>
          {/* Header */}
          <div className={styles.headerSection}>
            <div className={styles.cosmicPortal}>
              <div className={styles.portalInner}></div>
              <div className={styles.portalOrbit}></div>
              <div className={styles.portalGlow}></div>
            </div>
            <h1 className={styles.mainTitle}>Mulai Perjalanan Kosmik</h1>
            <p className={styles.subtitle}>
              Bergabung dengan Astro Oracles dan temukan takdir Anda
            </p>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: formStep === 'basic' ? '50%' : '100%' }}
            ></div>
          </div>

         {/* Form */}
          <form className={styles.signUpForm} onSubmit={handleSubmit}>
            {formStep === 'basic' ? (
              <BasicInfoStep 
                formData={formData}
                errors={errors}
                passwordStrength={passwordStrength}
                onChange={handleInputChange}
              />
            ) : (
              <ZodiacStep 
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
                onBack={handlePreviousStep}
              />
            )}

                        {/* Navigation Buttons */}
            <div className={styles.formNavigation}>
              {formStep === 'basic' ? (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={handleNextStep}
                >
                  Lanjut ke Profil Kosmik →
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.backStepButton}
                    onClick={handlePreviousStep}
                  >
                    ← Kembali
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className={styles.loadingSpinner}></span>
                        Membuat Akun...
                      </>
                    ) : (
                      'Selesaikan Pendaftaran ✨'
                    )}
                  </button>
                </>
              )}
            </div>
          </form>

                   {/* Divider */}
          <div className={styles.divider}>
            <span>atau lanjutkan dengan</span>
          </div>

          {/* Social Sign Up */}
          <div className={styles.socialSection}>
            <div className={styles.socialButtons}>
              <button className={styles.socialButton}>
                <span className={styles.socialIcon}>G</span>
                Google
              </button>
              <button className={styles.socialButton}>
                <span className={styles.socialIcon}>F</span>
                Facebook
              </button>
              <button className={styles.socialButton}>
                <span className={styles.socialIcon}>A</span>
                Apple
              </button>
            </div>
          </div>

                   {/* Footer Note */}
          <div className={styles.footerNote}>
            <p>
              Dengan mendaftar, Anda menyetujui{' '}
              <button type="button" className={styles.inlineLink}>
                Syarat Layanan
              </button>{' '}
              dan{' '}
              <button type="button" className={styles.inlineLink}>
                Kebijakan Privasi
              </button>{' '}
              kami
            </p>
          </div>
        </div>

        {/* Cosmic Benefits */}
        <div className={styles.benefitsSection}>
          <h3 className={styles.benefitsTitle}>Manfaat Bergabung</h3>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🔮</div>
              <h4>Ramalan Personal</h4>
              <p>Analisis zodiak berdasarkan profil unik Anda</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>💫</div>
              <h4>Kompatibilitas</h4>
              <p>Cek kecocokan dengan pasangan atau teman</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>📅</div>
              <h4>Horoskop Harian</h4>
              <p>Panduan kosmik untuk hari Anda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Basic Info Step Component
function BasicInfoStep({ 
  formData, 
  errors, 
  passwordStrength, 
  onChange 
}: { 
  formData: SignUpFormData;
  errors: FormErrors;
  passwordStrength: number;
  onChange: (field: keyof SignUpFormData, value: string | boolean) => void;
}) {
  return (
    <div className={styles.formStep}>
      <div className={styles.inputGrid}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.inputLabel}>
            <span className={styles.labelIcon}>👤</span>
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`${styles.formInput} ${errors.username ? styles.inputError : ''}`}
            placeholder="pilih nama kosmik Anda"
            value={formData.username}
            onChange={(e) => onChange('username', e.target.value)}
          />
          {errors.username && (
            <div className={styles.errorMessage}>{errors.username}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>
            <span className={styles.labelIcon}>✉️</span>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
            placeholder="alamat.email@domain.com"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="birthDate" className={styles.inputLabel}>
            <span className={styles.labelIcon}>🎂</span>
            Tanggal Lahir
          </label>
          <input
            type="date"
            id="birthDate"
            className={`${styles.formInput} ${errors.birthDate ? styles.inputError : ''}`}
            value={formData.birthDate}
            onChange={(e) => onChange('birthDate', e.target.value)}
          />
          {errors.birthDate && (
            <div className={styles.errorMessage}>{errors.birthDate}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.inputLabel}>
            <span className={styles.labelIcon}>🔒</span>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`${styles.formInput} ${errors.password ? styles.inputError : ''}`}
            placeholder="minimal 8 karakter"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
          />
          
          {/* Password Strength Meter */}
          <div className={styles.strengthMeter}>
            <div 
              className={`${styles.strengthBar} ${
                passwordStrength >= 25 ? styles.weak : ''
              } ${
                passwordStrength >= 50 ? styles.fair : ''
              } ${
                passwordStrength >= 75 ? styles.good : ''
              } ${
                passwordStrength === 100 ? styles.strong : ''
              }`}
              style={{ width: `${passwordStrength}%` }}
            ></div>
            <div className={styles.strengthLabel}>
              {passwordStrength === 0 ? 'Tidak ada' : ''}
              {passwordStrength > 0 && passwordStrength < 50 ? 'Lemah' : ''}
              {passwordStrength >= 50 && passwordStrength < 75 ? 'Cukup' : ''}
              {passwordStrength >= 75 && passwordStrength < 100 ? 'Baik' : ''}
              {passwordStrength === 100 ? 'Sangat Kuat' : ''}
            </div>
          </div>
          
          {errors.password && (
            <div className={styles.errorMessage}>{errors.password}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.inputLabel}>
            <span className={styles.labelIcon}>✅</span>
            Konfirmasi Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`${styles.formInput} ${errors.confirmPassword ? styles.inputError : ''}`}
            placeholder="ulangi password Anda"
            value={formData.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
          />
          {errors.confirmPassword && (
            <div className={styles.errorMessage}>{errors.confirmPassword}</div>
          )}
          {formData.password && formData.confirmPassword && 
           formData.password === formData.confirmPassword && (
            <div className={styles.successMessage}>✓ Password cocok</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Zodiac Step Component
function ZodiacStep({ 
  formData, 
  errors, 
  onChange, 
  onBack 
}: { 
  formData: SignUpFormData;
  errors: FormErrors;
  onChange: (field: keyof SignUpFormData, value: string | boolean) => void;
  onBack: () => void;
}) {
  return (
    <div className={styles.formStep}>
      {/* Zodiac Selection */}
      <div className={styles.zodiacSection}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>♋</span>
          Pilih Zodiak Anda
        </h3>
        <p className={styles.sectionDescription}>
          Zodiak akan membantu kami memberikan ramalan yang lebih personal
        </p>
        
        <div className={styles.zodiacGrid}>
          {zodiacOptions.map((zodiac) => (
            <button
              key={zodiac.value}
              type="button"
              className={`${styles.zodiacOption} ${
                formData.zodiac === zodiac.value ? styles.selected : ''
              }`}
              onClick={() => onChange('zodiac', zodiac.value)}
            >
              <div className={styles.zodiacSymbol}>{zodiac.symbol}</div>
              <div className={styles.zodiacInfo}>
                <h4>{zodiac.label}</h4>
                <p className={styles.zodiacDates}>{zodiac.dates}</p>
                <span className={styles.zodiacElement}>{zodiac.element}</span>
              </div>
              {formData.zodiac === zodiac.value && (
                <div className={styles.selectedIndicator}>✓</div>
              )}
            </button>
          ))}
        </div>
        
        {errors.zodiac && (
          <div className={styles.errorMessage}>{errors.zodiac}</div>
        )}
      </div>

      {/* Preferences */}
      <div className={styles.preferencesSection}>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => onChange('agreeTerms', e.target.checked)}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.checkboxText}>
              Saya setuju dengan{' '}
              <button type="button" className={styles.inlineLink}>
                Syarat Layanan
              </button>{' '}
              dan{' '}
              <button type="button" className={styles.inlineLink}>
                Kebijakan Privasi
              </button>
            </span>
          </label>
          {errors.agreeTerms && (
            <div className={styles.errorMessage}>{errors.agreeTerms}</div>
          )}
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => onChange('newsletter', e.target.checked)}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.checkboxText}>
              Saya ingin menerima horoskop mingguan dan update kosmik via email
            </span>
          </label>
        </div>
      </div>

      {/* Cosmic Tip */}
      <div className={styles.cosmicTip}>
        <div className={styles.tipIcon}>💡</div>
        <p>
          <strong>Tips Kosmik:</strong> Zodiak yang tepat akan memberikan 
          insight yang lebih akurat tentang kepribadian dan takdir Anda.
        </p>
      </div>
    </div>
  );
}