import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import ProductPage from "./components/ProductPage";
import SellerForm from "./components/SellerForm";
import { Provider, useSelector, useDispatch } from "react-redux";
import appStore from "../utils/store";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile/Profile";
import SellerHome from "./components/Home/SellerHome";
import BuyerHome from "./components/Home/BuyerHome";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home/Home";
import Cart from "./components/Cart";
import AboutUs from "./components/Aboutus";
import EditProduct from "./components/Home/EditProduct";

function App() {
  const [message, setMessage] = useState("");
    
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );
  
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token") !== null);
  }, [isAuthenticated]);

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

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token") !== null);
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />

            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/seller" element={<SellerForm />} />
              <Route path="/shome" element={<SellerHome />} />
              <Route path="/bhome" element={<BuyerHome />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/seller/edit/:id" element={<EditProduct />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/addProduct" element={<SellerForm />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
