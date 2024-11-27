import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <img
              src="/vite.svg" // Replace with your logo path
              alt="Company Logo"
              className="h-10 w-10 mr-3 rounded-full shadow-md"
            />
            <span className="text-3xl font-extrabold tracking-wide">TradeHub</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-lg text-white hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 ease-in-out"
            >
              Home
            </a>
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="px-6 py-2 bg-white text-blue-600 font-medium text-lg rounded-lg shadow-md hover:bg-blue-100 hover:shadow-lg transition duration-300 ease-in-out"
              >
                Login
              </button>
            ) : (
              <>
                <a
                  href="/profile"
                  className="text-lg text-white hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 ease-in-out"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-white text-red-600 font-medium text-lg rounded-lg shadow-md hover:bg-red-100 hover:shadow-lg transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
          <a
            href="/"
            className="block px-4 py-2 rounded-lg text-base font-medium text-white bg-blue-700 hover:bg-blue-800"
          >
            Home
          </a>
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="block w-full text-left px-4 py-2 rounded-lg text-base font-medium text-blue-600 bg-white hover:bg-blue-100"
            >
              Login
            </button>
          ) : (
            <>
              <a
                href="/profile"
                className="block px-4 py-2 rounded-lg text-base font-medium text-white bg-blue-700 hover:bg-blue-800"
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-lg text-base font-medium text-red-600 bg-white hover:bg-red-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
