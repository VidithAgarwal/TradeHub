import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-28 py-5">
      <nav className="flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-lg">
        <img src="./vite.svg" className="cursor-pointer"></img>
        <ul className="hidden w-full lg:flex lg:w-auto lg:items-center lg:justify-between lg:ml-auto">
          <li className="list-none inline-block px-5">
            <Link
              to="/"
              className="no-underline px-2 text-white hover:text-yellow-300"
            >
              Home
            </Link>
          </li>

          <li className="list-none inline-block px-5">
            <Link
              to="/home"
              className="no-underline px-2 text-white hover:text-yellow-300"
            >
              Features
            </Link>
          </li>
          <li className="list-none inline-block px-5">
            <a href="#" className="no-underline px-2  text-white">
              About Us
            </a>
          </li>
          {token ? (
            // If token exists, show Profile and Logout buttons
            <>
              <li className="list-none inline-block px-5">
                <Link
                  to="/profile"
                  className="no-underline px-2 text-white hover:text-yellow-300"
                >
                  Profile
                </Link>
              </li>
              <li className="list-none inline-block px-5">
                <button
                  onClick={handleLogout}
                  className="no-underline px-2 text-white hover:text-yellow-300 bg-transparent border-none cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (

            <>
              <li className="list-none inline-block px-5">
                <Link
                  to="/login"
                  className="no-underline px-2 text-white hover:text-yellow-300"
                >
                  Login
                </Link>
              </li>
              <li className="list-none inline-block px-5">
                <Link
                  to="/signup"
                  className="no-underline px-2 text-white hover:text-yellow-300"
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
