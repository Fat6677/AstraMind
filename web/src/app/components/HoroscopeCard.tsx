interface HoroscopeCardProps {
  sign: string;
  text: string;
  onReset: () => void;
}

export default function HoroscopeCard({ sign, text, onReset }: HoroscopeCardProps) {
  return (