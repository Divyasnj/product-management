import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ✅ Local images (place in /public/images/)
const bannerImages = [
  "/images/banner.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Slideshow */}
      <div className="relative w-full h-[320px] md:h-[450px] mt-1 overflow-hidden">
        {/* Image as background */}
        <img
          src={bannerImages[currentIndex]}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay (optional for darkening) */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Left Arrow */}
        <button
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
            )
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:bg-white"
        >
          ◀
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % bannerImages.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:bg-white"
        >
          ▶
        </button>
      </div>

      {/* ✅ Sections like Amazon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {/* Section 1 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3">Revamp your home in style</h2>
          <div className="grid grid-cols-2 gap-3">
            <img
              src="/images/decor.jpeg"
              alt="Decor"
              className="w-full h-32 object-cover rounded"
            />
            <img
              src="/images/furniture.jpeg"
              alt="Furniture"
              className="w-full h-32 object-cover rounded"
            />
          </div>
          <Link
            to="/products"
            className="block mt-3 text-sm text-teal-600 hover:underline"
          >
            Shop now
          </Link>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3">Appliances for your home</h2>
          <div className="grid grid-cols-2 gap-3">
            <img
              src="/images/ac.jpeg"
              alt="AC"
              className="w-full h-32 object-cover rounded"
            />
            <img
              src="/images/fridge.jpeg"
              alt="Fridge"
              className="w-full h-32 object-cover rounded"
            />
          </div>
          <Link
            to="/products"
            className="block mt-3 text-sm text-teal-600 hover:underline"
          >
            See more deals
          </Link>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3">Starting ₹149 | Headphones</h2>
          <div className="grid grid-cols-2 gap-3">
            <img
              src="/images/headphones.jpeg"
              alt="Headphones"
              className="w-full h-32 object-cover rounded"
            />
            <img
              src="/images/earbuds.jpeg"
              alt="Earbuds"
              className="w-full h-32 object-cover rounded"
            />
          </div>
          <Link
            to="/products"
            className="block mt-3 text-sm text-teal-600 hover:underline"
          >
            Explore more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
