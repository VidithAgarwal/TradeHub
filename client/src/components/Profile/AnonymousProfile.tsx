import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getProfileDetails,
  updateProfile,
  getUserOrders,
  getProductsBySeller,
} from "../../services/api";
import { FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const AnonymousProfile = () => {
  const [user, setUser] = useState({});

  const [products, setProducts] = useState([]);
  const location = useLocation();
  const userId = location?.state?._id;
  const userRole = localStorage.getItem("role");

  const fetchUserData = async () => {
    const userDetails = await getProfileDetails(userId);
    setUser(userDetails);
  };

  const fetchProductData = async () => {
    if (userRole === "buyer") {
      const response = await getProductsBySeller(userId);
      setProducts(response?.products);
    } else {
      const response = await getUserOrders(userId);
      setProducts(response?.products);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name
              )}&background=random`}
              alt="Profile Avatar"
              className="w-28 h-28 rounded-full mx-auto shadow-md"
            />
            <h2 className="text-2xl font-semibold mt-4">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-gray-600">Full Name:</p>
              <div className="flex items-center">
                <p className="text-gray-700">{user?.name}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Phone:</p>
              <div className="flex items-center">
                <p className="text-gray-700">{user?.phone || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {userRole !== "buyer" ? "Purchased Products" : "Items Listed"}
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">Price: ${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnonymousProfile;
