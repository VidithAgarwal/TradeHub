import { useState, useEffect } from "react";
import { getProductsBySeller, deleteProduct } from "../../services/api";
import { useNavigate } from "react-router-dom";

const SellerHome = () => {
  const [itemsForSale, setItemsForSale] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    const userId = localStorage.getItem("id");
    try {
      const response = await getProductsBySeller(userId);
      setItemsForSale(response?.products || []);
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
    <div className="container mx-auto px-4 py-8">
      <header className="text-4xl font-extrabold text-gray-800 text-center mb-10">
        Your Listed Products
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {itemsForSale.length === 0 ? (
          <p className="text-center text-gray-600 text-lg col-span-full">
            You have no items listed for sale.
          </p>
        ) : (
          itemsForSale.map((item) => (
            <div
              key={item?._id}
              className={`relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 ${
                item.sold ? "opacity-75" : "opacity-100"
              }`}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-contain rounded-t-lg"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 truncate mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Price:</span> {item.price} USD
                </p>
                {item.sold && (
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Sold Price:</span> {item.price} USD
                  </p>
                )}
                <p
                  className={`text-sm font-medium ${
                    item.sold ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.sold ? "Sold" : "Available"}
                </p>

                {item.sold && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Buyer:</span>{" "}
                      {item?.buyerDetails?.name || "Anonymous"}
                    </p>
                    {item?.buyer?.profileLink && (
                      <a
                        href={item?.buyer?.profileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Profile
                      </a>
                    )}
                  </div>
                )}
              </div>
              {item.sold && (
                <span className="absolute top-3 right-3 bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                  Sold
                </span>
              )}
              <div className="flex justify-between p-4 border-t border-gray-200">
                <button
                  onClick={() => navigate(`/seller/edit/${item._id}`)}
                  disabled={item.sold}
                  className={`w-1/2 mx-1 text-center px-4 py-2 rounded-lg font-medium transition-all ${
                    item.sold
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "text-white bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={item.sold}
                  className={`w-1/2 mx-1 text-center px-4 py-2 rounded-lg font-medium transition-all ${
                    item.sold
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "text-white bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerHome;
