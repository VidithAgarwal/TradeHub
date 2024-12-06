import React from "react";
import { useState, useEffect } from "react";
import { products } from "../../../utils/products.js";

const Home = () => {

  return (
    <div className="container min-h-screen  px-28 py-5 ">

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
            Price Range
          </label>
          <input type="range" min="0" max="1000" className="w-full" />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <select className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>4.0+</option>
            <option>4.5+</option>
            <option>5.0</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Sort By</h3>
          <select
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>
      </aside>

      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product : any) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition"
          >
            <img
              src={`https://via.placeholder.com/150?text=${product.name}`}
              alt={product.name}
              className="h-32 w-full object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-sm">
                  {"★".repeat(Math.floor(product.rating))}☆
                </span>
                <span className="text-gray-600 text-sm ml-2">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  </div>
  )
  // return (
  //   <div>
  //     <div className="w-full bg-gray-100">
  //       <header className="bg-white shadow">
  //         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
  //           <h1 className="text-2xl font-bold text-gray-800">Marketplace</h1>
  //           <input
  //             type="text"
  //             placeholder="Search for products"
  //             className="border rounded-lg px-4 py-2 w-1/2 focus:outline-none focus ring-blue-500"
  //           />
  //         </div>
  //       </header>

  //       <div className="container mx-auto px-6 py-8 flex">
  //         <aside className="w-1/5 p-4 bg-white rounded-lg shadow hidden md:block">
  //           <h2 className="text-xl font-bold mb-4">Filters</h2>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium mb-2">
  //               Price Range
  //             </label>
  //             <input type="range" min="0" max="1000" className="w-full" />
  //           </div>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium mb-2">
  //               Minimum Rating
  //             </label>
  //             <select className="w-full border rounded-lg px-2 py-2 focus:outline-none">
  //               <option>4.0+</option>
  //               <option>4.5+</option>
  //               <option>5.0</option>
  //             </select>
  //           </div>
  //         </aside>

  //         <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  //           {products.map((product: any) => (
  //             <div
  //               key={product.id}
  //               className="bg-white rounded-lg shadow p-4 transform hover:scale-105 hover:shadow-lg transition duration-300"
  //             >
  //               <img
  //                 src={`https://via.placeholder.com/150?text=${product.name}`}
  //                 alt={product.name}
  //                 className="h-32 w-full object-cover rounded-t-lg"
  //               />
  //               <div className="mt-2">
  //                 <h3 className="text-lg font-semibold">{product.name}</h3>
  //                 <p className="text-gray-600">${product.price.toFixed(2)}</p>
  //                 <div className="flex items-center mt-1">
  //                   <span className="text-yellow-500 text-sm">
  //                     {"★".repeat(Math.floor(product.rating))}☆
  //                   </span>
  //                   <span className="text-gray-600 text-sm ml-2">
  //                     {product.rating}
  //                   </span>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </main>
  //       </div>
  //       <div className="container mx-auto px-6 py-4 flex justify-center">
  //         <nav className="flex">
  //           <button className="px-3 py-1 mx-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition">
  //             Previous
  //           </button>
  //           <button className="px-3 py-1 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
  //             1
  //           </button>
  //           <button className="px-3 py-1 mx-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition">
  //             2
  //           </button>
  //           <button className="px-3 py-1 mx-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition">
  //             Next
  //           </button>
  //         </nav>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Home;
