import React, { useState } from "react";
import { addProduct, getPreSignedURL, uploadFile } from "../services/api";
import { useNavigate } from "react-router-dom";

const SellerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    location: "",
    image: "",
    price: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [fileToUpload, setFileToUpload] = useState<File>();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileToUpload(file);
    try {
      const response = await getPreSignedURL(file?.name, file?.type);
      setImageUrl(response?.url);
    } catch (err) {
      console.error("Error uploading file", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.description ||
      !formData.quantity ||
      !formData.location ||
      !formData.price ||
      !formData.category
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      let finalImageUrl = "";
      if (fileToUpload && imageUrl) {
        // Upload the file to the pre-signed URL
        await uploadFile(imageUrl, fileToUpload);

       
        const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;
        const fileKey = fileToUpload.name; 
        finalImageUrl = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
      }

     
      const formWithImage = { ...formData, image: finalImageUrl };
      console.log("Final Product Data:", formWithImage);

     
      await addProduct(formWithImage);
      setSuccess("Product added successfully!");
      navigate("/shome");
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="w-full max-w-xl bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold text-center text-blue-600">
          Add Product
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Fill out the form below to list a product.
        </p>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-6 space-y-6"
        >
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Vehicle">Vehicles</option>
              <option value="toys-and-games">Toys and Games</option>
              <option value="home-goods">Home Goods</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              required
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter product quantity"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter product location"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Submit Product
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerForm;
