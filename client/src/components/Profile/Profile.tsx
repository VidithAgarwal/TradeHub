const Profile = () => {
  const user = {
    _id: "674fc9f891e5cf46039a3624",
    name: "Jenish Kothari",
    email: "kotharijenish2001@gmail.com",
    role: "buyer",
    createdAt: "2024-12-04T03:18:16.505Z",
  };
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center py-6">
          <p className="mt-2">{user.email}</p>
        </div>

        <div className="flex justify-center mt-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=random`}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-600 text-sm">Full Name</p>
            <p className="text-lg font-medium text-gray-900">{user.name}</p>
          </div>
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
