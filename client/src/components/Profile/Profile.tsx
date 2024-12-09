import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProfileDetails, updateProfile } from "../../services/api";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);

  const fetchUserData = async () => {
    const userId = localStorage.getItem("id");
    const userDetails = await getProfileDetails(userId);
    setUser(userDetails);
    setFormData({ name: userDetails.name, phone: userDetails.phone });
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

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center py-6">
          <p className="mt-2">{user?.email}</p>
        </div>

        <div className="flex justify-center mt-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name
            )}&background=random`}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        <div className="p-6">
          {!editingName ? (
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Full Name</p>
              <p className="text-lg font-medium text-gray-900">{user.name}</p>
              <FaEdit
                onClick={() => setEditingName(true)}
                className="text-blue-600 text-xl cursor-pointer hover:text-blue-800"
                title="Edit Name"
              />
            </div>
          ) : (
            <form onSubmit={handleNameUpdate}>
              <label className="text-gray-600 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingName(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </form>
          )}

          {!editingPhone ? (
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Phone Number</p>
              <p className="text-lg font-medium text-gray-900">
                {user.phone || "Not provided"}
              </p>
              <FaEdit
                onClick={() => setEditingPhone(true)}
                className="text-blue-600 text-xl cursor-pointer hover:text-blue-800"
                title="Edit Phone"
              />
            </div>
          ) : (
            <form onSubmit={handlePhoneUpdate}>
              <label className="text-gray-600 text-sm">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingPhone(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </form>
          )}

          <div className="mb-4">
            <p className="text-gray-600 text-sm">Email Address</p>
            <p className="text-lg font-medium text-gray-900">{user.email}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 text-sm">Role</p>
            <p className="text-lg font-medium text-gray-900 capitalize">
              {user.role}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 text-sm">Member Since</p>
            <p className="text-lg font-medium text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
