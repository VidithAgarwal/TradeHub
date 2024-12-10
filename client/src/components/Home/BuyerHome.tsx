import React, { useState, useEffect } from "react";
import { getProducts } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const BuyerHome = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.filter((product: any) => product.sold === false));
      setFilteredProducts(
        response.filter((product: any) => product.sold === false)
      );

      const uniqueCategories = Array.from(
        new Set(response.map((product: any) => product.category))
      );
      setCategories(uniqueCategories);

      setError("");
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    applyFilters(category, priceRange, sortBy, searchQuery);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const range = Number(event.target.value);
    setPriceRange(range);
    applyFilters(selectedCategory, range, sortBy, searchQuery);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    setSortBy(sortOption);
    applyFilters(selectedCategory, priceRange, sortOption, searchQuery);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(selectedCategory, priceRange, sortBy, query);
  };

  const applyFilters = (
    category: string,
    range: number,
    sortOption: string,
    query: string
  ) => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter(
        (product: any) => product.category === category
      );
    }

    filtered = filtered.filter((product: any) => product.price <= range);

    if (sortOption === "price-asc") {
      filtered = filtered.sort((a: any, b: any) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered = filtered.sort((a: any, b: any) => b.price - a.price);
    }

    if (query) {
      filtered = filtered.filter((product: any) =>
        product.name.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container min-h-screen px-28 py-5">
      <div className="text-center mb-10">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-2/3 md:w-1/2 lg:w-1/3 px-4 py-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-5">
        <aside className="w-1/4 hidden lg:block bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: Up to ${priceRange}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Categories
            </h3>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Sort By</h3>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </aside>

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition"
                onClick={() =>
                  navigate(`/bhome/${product._id}`, { state: product })
                }
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-full object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-3">
                    Location: {product.location}
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    Description : {product.description}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/bhome/${product._id}`, { state: product })
                    }
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products available.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default BuyerHome;
