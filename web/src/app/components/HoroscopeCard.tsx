interface HoroscopeCardProps {
  sign: string;
  text: string;
  onReset: () => void;
}

export default function HoroscopeCard({ sign, text, onReset }: HoroscopeCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Ramalan untuk {sign}</h2>
      <p className="text-gray-700 text-lg leading-relaxed text-center">{text}</p>
      <button
        onClick={onReset}
        className="mt-6 w-full bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}