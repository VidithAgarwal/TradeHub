import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<any[]>([
    {
      _id: "1",
      name: "Sample Product",
      image: "https://via.placeholder.com/150",
      price: 25.99,
    },
    {
      _id: "2",
      name: "Another Product",
      image: "https://via.placeholder.com/150",
      price: 15.49,
    },
  ]); 
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="container mx-auto px-6 py-5 min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-black">Products Bought</h2>
        <div className="flex justify-center mt-4">
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2pvYjE0MjgtZWxlbWVudC0xMDctcC5wbmc.png"
            alt="Cart"
            className="h-16 w-16"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products bought...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : cartProducts.length > 0 ? (
        <div className="space-y-6">
          {cartProducts.map((product: any) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-6 flex items-center hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 object-cover rounded-lg mr-6"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 font-medium">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products bought yet.</p>
      )}
    </div>
  );
};

export default Cart;
