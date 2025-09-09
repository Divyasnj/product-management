import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "New Product", path: "/add-product" },
    { name: "Product Catalog", path: "/products" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide cursor-pointer">
          🛒 Product<span className="text-yellow-300">Management</span>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-yellow-300 text-blue-700 shadow-lg"
                    : "bg-white/20 hover:bg-yellow-300 hover:text-blue-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-full font-medium text-center transition-all duration-300 ${
                  isActive
                    ? "bg-yellow-300 text-blue-700 shadow-lg"
                    : "bg-white/20 hover:bg-yellow-300 hover:text-blue-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
