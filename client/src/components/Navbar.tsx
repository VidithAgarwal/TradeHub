import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LogoutPageProps = {
  onLogout: () => void;
};

const Navbar: React.FC<LogoutPageProps>= ({onLogout}) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    onLogout()
    navigate("/");
  };

  console.log(userRole)
  return (
    <div className="container mx-auto px-6 py-5">
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-lg">
        <Link to="/" className="text-xl font-bold cursor-pointer">
          <img src="./vite.svg" alt="Logo" className="h-8 inline-block" />
        </Link>

        <button
          className="lg:hidden block text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
        <ul
          className={`lg:flex lg:items-center lg:justify-between lg:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:w-auto lg:flex-row flex flex-col lg:ml-auto mt-4 lg:mt-0`}
        >
          <li>
            <Link
              to="/"
              className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={
                userRole === "buyer"
                  ? "/bhome"
                  : userRole === "seller"
                  ? "/shome"
                  : userRole === "admin"
                  ? "/adminhome"
                  : "/home"
              }
              className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0"
            >
              Features
            </Link>
          </li>

          {userRole === "seller" && (
            <Link
              to="/addProduct"
              className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0"
            >
              Add Product
            </Link>
          )}
          {userRole === "buyer" && (
            <Link
              to="/cart"
              className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0"
            >
              Orders
            </Link>
          )}

          {userRole !== "admin" && (
            <li>
              <Link
                to="/aboutus"
                className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0"
              >
                About Us
              </Link>
            </li>
          )}

          {token ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0 bg-transparent border-none cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block no-underline text-white hover:text-yellow-300 px-4 py-2 lg:py-0"
                >
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
