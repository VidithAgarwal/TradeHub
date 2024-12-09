import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
    location: "",
    seller: { id: "", name: "" },
  });

  const [error, setError] = useState("");

  useEffect(() => {
    // Mock data for testing
    const mockProducts = [
      {
        id: "1",
        name: "iPhone 16 Pro",
        description: "Experience the future of technology with the iPhone 16 Pro. Featuring a stunning titanium design, an advanced A18 Bionic chip for lightning-fast performance, a ProMotion XDR display, and a groundbreaking 48MP triple-camera system for pro-level photography. With all-day battery life, enhanced durability, and the latest iOS, the iPhone 16 Pro redefines what a smartphone can do.",
        price: 999,
        quantity: 20,
        image: "https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-16-pro-white-titanium?wid=930&hei=930&fmt=webp",
        location: "San Francisco, CA",
        seller: { id: "seller123", name: "John Doe" },
      },
    ];

    // Fetching mock product based on ID
    const productData = mockProducts.find((item) => item.id === id);
    if (productData) {
      setProduct(productData);
      setError("");
    } else {
      setError("Product not found");
    }
  }, [id]);

  const handleSellerClick = () => {
    navigate(`/seller/${product.seller.id}`);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        {error ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-extrabold text-red-600">Error</h1>
            <p className="mt-4 text-gray-700">{error}</p>
          </div>
        ) : (
          <div className="bg-gray-200 rounded-lg shadow-lg p-8 flex flex-col md:flex-row md:items-start md:max-w-4xl mx-auto">
            {/* Product Image */}
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg shadow-md w-full max-w-sm"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-blue-600">{product.name}</h1>
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
                <p className="mt-4 text-2xl font-bold text-indigo-600">${product.price}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Available Quantity: {product.quantity}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6">
                <button
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