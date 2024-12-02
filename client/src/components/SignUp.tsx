import React, { useState } from "react";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("User Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
          <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold text-center text-blue-600">Sign Up</h2>
            <p className="mt-2 text-center text-sm text-gray-500">
          Please fill in your details to create an account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Role Selector */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              id="role" name="role" required value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select your role 
              </option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name" name="name" type="text" required value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email" name="email" type="email" required value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Mobile Number Input */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input id="mobile" name="mobile" type="tel" required value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input id="password" name="password" type="password" required
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-center text-green-600 font-medium">
            Successfully Signed Up!
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
