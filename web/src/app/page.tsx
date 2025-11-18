import Image from "next/image";

export default function Home() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
      {/* Nama / Logo */}
      <h1 className="text-xl font-bold">Nama Aplikasi</h1>

      {/* Tombol Login */}
      <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
        Login
      </button>
    </header>
  );
}
