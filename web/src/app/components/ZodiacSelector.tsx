'use client';

import { FormEvent } from 'react';
interface ZodiacSelectorProps {
    onSignSelect: (sign: string) => void;
    isLoading: boolean;
}

const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export default function ZodiacSelector({ onSignSelect, isLoading }: ZodiacSelectorProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const sign = formData.get('zodiac') as string;
        if (sign) {
            onSignSelect(sign);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="zodiac" className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Tanda Zodiak Anda
                </label>
                <select
                    id="zodiac"
                    name="zodiac"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                    <option value="">Pilih Zodiak</option>
                    {zodiacSigns.map(sign => (
                        <option key={sign} value={sign}>{sign}</option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? 'Membuat Ramalan...' : 'Dapatkan Ramalan Saya'}
            </button>
        </form>
    );
}