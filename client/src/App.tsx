import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUp";
import LoginPage from './components/LoginPage';
import ProductPage from "./components/ProductPage";

function App() {
  const [message, setMessage] = useState('');
    useEffect(() => {
        const checkServerConnection = async () => {
            try {
                const response = await axios.get('http://localhost:5000/');
                setMessage(response.data);
            } catch (error) {
                console.error('Error connecting to the server:', error);
                setMessage('Failed to connect to the server');
            }
        };

        checkServerConnection();
    }, []);


  return (
<Router>
      <Navbar />
      <div className="mt-16"> 
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold">Welcome to TradeHub!</h1>
                <p className="mt-4">{message}</p>
              </div>
            }
          />

          {/* Sign Up Page Route */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
