import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [redirectPath, setRedirectPath] = useState("/home");
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and role from localStorage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "seller") {
        setRedirectPath("/shome");
      } else if (role === "buyer") {
        setRedirectPath("/bhome");
      } else if (role === "admin") {
        setRedirectPath("/adminhome");
      }
    } else {
      setRedirectPath("/home"); // Default path for unauthenticated users
    }
  }, []);

  return (
    <div className="container min-h-screen px-28 py-5">
      <div className="flex flex-col justify-center items-center text-center mt-20">
        <h1 className="text-6xl font-bold text-gray-800 leading-tight">
          Trade Items Online <br /> Within Clicks
        </h1>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl">
          TradeHub offers a platform for buyers and sellers to trade their
          products online. Join us today to experience seamless trading like
          never before!
        </p>
        <div className="mt-8 flex space-x-6">
          <button
            onClick={() => navigate(redirectPath)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition"
          >
            Get Started
          </button>
          <a
            href="/aboutus"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg font-medium shadow-md transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
