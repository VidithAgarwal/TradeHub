import React, { useState, useEffect } from "react";
import { getProducts } from "../../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data?.products);
      setFilteredProducts(data?.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (err) {
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
    applyFilters(category, priceRange, sortBy);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const range = Number(event.target.value);
    setPriceRange(range);
    applyFilters(selectedCategory, range, sortBy);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    setSortBy(sortOption);
    applyFilters(selectedCategory, priceRange, sortOption);
  };

  const applyFilters = (
    category: string,
    range: number,
    sortOption: string
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

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="container min-h-screen px-28 py-5">
      <div className="text-center mb-10">
        <input
          type="text"
          placeholder="Search for products..."
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
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Vehicle">Vehicle</option>
              <option value="home-goods">Home Goods</option>
              <option value="toys-and-games">Toys and Games</option>
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
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-32 w-full object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    Location: {product.location}
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    Sold By:{" "}
                    <Link
                      to={`/seller/${product?.seller?._id}`}
                      className="underline"
                    >
                      {product?.seller?.name}
                    </Link>
                  </p>
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

export default Home;
