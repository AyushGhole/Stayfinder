import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken } from "../utils/decodeToken";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decoded = decodeToken(token);
    if (decoded) {
      setUser(decoded); // decoded contains: { id, name, iat, exp }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link
        to="/listing"
        className="text-2xl font-bold text-blue-700 tracking-wide">
        StayFinder
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/add-listing"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
          Add Listing
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Welcome,{" "}
              <span className="font-semibold text-blue-700">{user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
