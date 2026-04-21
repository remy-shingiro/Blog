import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Blog</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/create" className="hover:text-gray-300">
          Write
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;