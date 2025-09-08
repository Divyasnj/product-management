import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Product Management</h1>
        <div className="space-x-6">
          <Link to="/add-product" className="hover:text-gray-200 font-medium transition-colors">
            New Product
          </Link>
          <Link to="/products" className="hover:text-gray-200 font-medium transition-colors">
            Product Catalog
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
