export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌌</span>
          <h1 className="text-2xl font-bold tracking-tight">AstraMind</h1>
        </div>
        <p className="text-sm text-gray-500 hidden sm:block">Ramalan Harian Pintar</p>
      </div>
    </header>
  );
}