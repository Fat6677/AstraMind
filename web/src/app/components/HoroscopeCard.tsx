interface HoroscopeCardProps {
  sign: string;
  text: string;
  onReset: () => void;
}

export default function HoroscopeCard({ sign, text, onReset }: HoroscopeCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Ramalan untuk {sign}</h2>