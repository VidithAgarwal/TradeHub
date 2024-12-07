import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import ProductPage from "./components/ProductPage";
import Home from "./components/Home/Home";
import { Provider, useSelector, useDispatch } from "react-redux";
import appStore from "../utils/store";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile/Profile";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setMessage(response.data);
      } catch (error) {
        console.error("Error connecting to the server:", error);
        setMessage("Failed to connect to the server");
      }
    };

    checkServerConnection();
  }, []);

  // const isLoggedIn = false;
  // const isLoggedIn = useSelector((appStore: any) => appStore.user);
  // console.log(isLoggedIn)
  console.log(appStore.getState());

  const isLoggedIn = useSelector((store: any) => store?.user?.isLoggedIn);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
    <Router>
      <Navbar />
      <div>
        <Routes>
  
          <Route path="/" element={<LandingPage />} />
          {/* Sign Up Page Route */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
