interface HoroscopeCardProps {
  sign: string;
  text: string;
  onReset: () => void;
}

export default function HoroscopeCard({ sign, text, onReset }: HoroscopeCardProps) {
  return (
      <div className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl">
       <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Ramalan untuk {sign}
      </h2>
       <p className="text-gray-700 text-lg leading-relaxed text-center">{text}</p>
      <button
        onClick={onReset}
        className="mt-8 w-full bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
      >
        Coba Lagi
      </button>
    </div>
  );
}