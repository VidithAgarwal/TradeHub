import { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
  getProductsBySeller,
} from "../../services/api";
import { useNavigate } from "react-router-dom";
const SellerHome = () => {
  const [itemsForSale, setItemsForSale] = useState([]);
  const navigate = useNavigate();
  
  const fetchItems = async () => {
    const userId = localStorage.getItem("id");
    try {
      const response = await getProductsBySeller(userId);
      setItemsForSale(response?.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    fetchItems();
  };

  return (
    <div className="container mx-auto">
      <header className="text-3xl font-bold text-gray-800 text-center mt-10">
        Items Listed for Sale
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 mt-10">
        {itemsForSale.map((item) => {
          console.log(item);
          return (
            <div
              key={item?._id}
              className={`relative p-6 border rounded-xl shadow-lg transform transition-all hover:scale-105 ${
                item.sold ? "bg-gray-200" : "bg-white"
              }`}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
                />
              )}
              <h2 className="text-lg font-bold mb-2 text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Listing Price: {item.price} USD
              </p>
              {item.sold && (
                <p className="text-gray-600 text-sm mb-2">
                  Sold Price: {item.price}
                </p>
              )}
              <p
                className={`text-sm font-semibold ${
                  item.sold ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.sold ? "Sold" : "Available"}
              </p>
              {item.sold && (
                <p className="text-gray-600 text-sm mb-4">
                  Buyer:{item?.buyerDetails?.name}
                  <a
                    href={item?.buyer?.profileLink}
                    target="_blank"
                    rel="noopener no referrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {item?.buyer?.name}
                  </a>
                </p>
              )}
              {item.sold && (
                <span className="absolute top-3 right-3 bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                  Sold
                </span>
              )}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/seller/edit/${item._id}`)}
                  className="flex-1 text-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-2 transition-all"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item?._id, item?.seller?._id)} // Replace with delete logic
                  disabled={item.sold}
                  className={`flex-1 text-center px-4 py-2 rounded-lg transition-all ${
                    item.sold
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "text-white bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerHome;
