export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Astro AI.
      </div>
    </footer>
  );
}