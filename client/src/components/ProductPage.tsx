import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { buyProduct } from "../services/api";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSellerClick = () => {
    setShowModal(true);
  };

  const purchaseProduct = async (productId: string) => {
    try {
      await buyProduct(productId);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate(-1);
      }, 2000);
    } catch (err) {
      setError("Failed to purchase the product. Please try again.");
      console.error("Error purchasing the product:", err);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto p-6">
      {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Seller Details</h2>
              <p className="text-gray-700 mb-2">
                <strong>Name:</strong> {product.seller.name}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> {product.seller.email}
              </p>
              <button
                className="w-full py-2 px-4 bg-red-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                onClick={() => setShowModal(false)}
              >
                Return
              </button>
            </div>
          </div>
        )}
        {success && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            Product purchased successfully! Redirecting to home...
          </div>
        )}
        {error ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-extrabold text-red-600">Error</h1>
            <p className="mt-4 text-gray-700">{error}</p>
          </div>
        ) : (
          <div className="bg-gray-200 rounded-lg shadow-lg p-8 flex flex-col md:flex-row md:items-start md:max-w-4xl mx-auto">
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg shadow-md w-full max-w-sm"
              />
            </div>

            <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-blue-600">
                  {product.name}
                </h1>
                <p className="mt-4 text-gray-700">{product.description}</p>
                <p className="mt-4 text-gray-700">
                  <strong>Location:</strong> {product.location}
                </p>
                <p className="mt-4 text-gray-700">
                  <strong>Seller:</strong>{" "}
                  <span
                    className="text-indigo-600 underline cursor-pointer"
                    onClick={handleSellerClick}
                  >
                    {product.seller.name}
                  </span>
                </p>
                <p className="mt-4 text-2xl font-bold text-indigo-600">
                  ${product.price}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Available Quantity: {product.quantity}
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => purchaseProduct(product._id)}
                  className="w-full py-2 px-4 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
