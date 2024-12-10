import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHome = () => {
  const [sellers, setSellers] = useState<any[]>([]);
  const [buyers, setBuyers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const fetchUsersWithProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await axios.get(
        "http://localhost:5000/api/user/get-users-with-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;

      if (data.success) {
        setSellers(data.data.sellers || []);
        setBuyers(data.data.buyers || []);
        setError("");
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await axios.get(
        `http://localhost:5000/api/user/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (data.success) {
        setMessage("User deleted successfully!");
        fetchUsersWithProducts();
      } else {
        setMessage("Failed to delete user.");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || err.message || "Failed to delete user.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchUsersWithProducts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-600">Admin Dashboard</h1>
        <p className="text-gray-600 text-lg mt-4">
          Manage and view all registered users and their products.
        </p>
      </div>

      {/* Success Notification */}
      {message && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-md text-center"
          style={{ zIndex: 1000 }}
        >
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-12 flex flex-col items-center">
          {/* Sellers Section */}
          <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sellers</h2>
            {sellers.length > 0 ? (
              sellers.map((seller) => (
                <div
                  key={seller._id}
                  className="bg-white max-w-lg mx-auto rounded-lg shadow p-6 mb-6 relative"
                >
                  <button
                    onClick={() => deleteUser(seller._id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    ✖
                  </button>
                  <h3 className="text-xl font-bold text-blue-600">{seller.name}</h3>
                  <p className="text-gray-600">Email: {seller.email}</p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-4">
                    Products Sold:
                  </h4>
                  {seller.soldProducts.length > 0 ? (
                    <ul className="list-disc ml-6">
                      {seller.soldProducts.map((product: any) => (
                        <li key={product._id} className="text-gray-700">
                          {product.name} - ${product.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No products sold yet.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No sellers registered yet.</p>
            )}
          </div>

          {/* Buyers Section */}
          <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Buyers</h2>
            {buyers.length > 0 ? (
              buyers.map((buyer) => (
                <div
                  key={buyer._id}
                  className="bg-white max-w-lg mx-auto rounded-lg shadow p-6 mb-6 relative"
                >
                  <button
                    onClick={() => deleteUser(buyer._id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    ✖
                  </button>
                  <h3 className="text-xl font-bold text-blue-600">{buyer.name}</h3>
                  <p className="text-gray-600">Email: {buyer.email}</p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-4">
                    Products Purchased:
                  </h4>
                  {buyer.purchasedProducts && buyer.purchasedProducts.length > 0 ? (
                    <ul className="list-disc ml-6">
                      {buyer.purchasedProducts.map((product: any) => (
                        <li key={product._id} className="text-gray-700">
                          {product.name} - ${product.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No products purchased yet.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No buyers registered yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
