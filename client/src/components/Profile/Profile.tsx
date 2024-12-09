import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getProfileDetails,
  updateProfile,
  getUserOrders,
  getProductsBySeller,
} from "../../services/api";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");

  const fetchUserData = async () => {
    const userId = localStorage.getItem("id");
    const userDetails = await getProfileDetails(userId);
    setUser(userDetails);
    setFormData({ name: userDetails.name, phone: userDetails.phone });
  };

  const fetchProductData = async () => {
    if (userRole === "buyer") {
      const response = await getUserOrders(userId);
      setProducts(response?.products);
    } else {
      const response = await getProductsBySeller(userId);
      console.log(response);
      setProducts(response?.products);
    }
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    await updateProfile(userId, { name: formData.name });
    setEditingName(false);
    fetchUserData();
  };

  const handlePhoneUpdate = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    await updateProfile(userId, { phone: formData.phone });
    setEditingPhone(false);
    fetchUserData();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            {!editingName ? (
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium text-gray-600">Full Name:</p>
                <div className="flex items-center">
                  <p className="text-gray-700">{user?.name}</p>
                  <FaEdit
                    onClick={() => setEditingName(true)}
                    className="ml-2 text-blue-600 cursor-pointer hover:text-blue-800"
                    title="Edit Name"
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleNameUpdate} className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingName(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {!editingPhone ? (
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-600">Phone:</p>
                <div className="flex items-center">
                  <p className="text-gray-700">
                    {user?.phone || "Not provided"}
                  </p>
                  <FaEdit
                    onClick={() => setEditingPhone(true)}
                    className="ml-2 text-blue-600 cursor-pointer hover:text-blue-800"
                    title="Edit Phone"
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handlePhoneUpdate}>
                <label className="block text-sm font-medium text-gray-600">
                  Phone Number:
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPhone(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {userRole === "buyer" ? "Purchased Products" : "Items Listed"}
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
                    <p className="text-sm text-gray-500 mt-2">
                      {userRole === "buyer"
                        ? `Sold by: ${product?.seller?.name}`
                        : product.sold
                        ? `Sold to: ${product?.buyerDetails?.name}`
                        : "Available"}
                    </p>
                    {/* <a
                      href={`/profile/${product.buyerId || product.sellerId}`}
                      className="text-blue-500 hover:underline mt-2 block"
                    >
                      View Profile
                    </a> */}
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

export default Profile;
