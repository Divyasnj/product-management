import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useCart } from "../context/cartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "New Product", path: "/add-product" },
    { name: "Product Catalog", path: "/products" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide cursor-pointer">
          🛒 Product<span className="text-yellow-300">Management</span>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
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
                <div className="relative">
                  {link.name}
                  {link.name === "Cart" && cart.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                      {cart.length}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
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
                <div className="flex justify-center items-center gap-2">
                  <span>{link.name}</span>
                  {link.name === "Cart" && cart.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2">
                      {cart.length}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Mobile Logout */}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="block w-full bg-red-500 text-white px-4 py-2 rounded-full font-medium text-center"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
