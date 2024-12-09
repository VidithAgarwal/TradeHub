import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-10 min-h-screen">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-600">About Us</h1>
        <p className="text-gray-600 text-lg mt-4">
          Welcome to <span className="text-blue-600 font-bold">TradeHub</span> – 
          your trusted marketplace for buying and selling products effortlessly.
        </p>
      </div>

      {/* About Us Content Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 lg:flex lg:justify-between">
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What is TradeHub?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            TradeHub is an innovative platform designed to connect buyers and sellers seamlessly. Whether you want to discover amazing deals, list your products for sale, or explore trending items, TradeHub ensures a hassle-free experience. Our user-friendly design, secure transactions, and extensive product categories make us the go-to choice for thousands of users.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            With integrations to external APIs, even non-logged-in users can explore and purchase from a wide range of external marketplaces. We aim to create a shopping and selling experience that is both versatile and enjoyable.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
          <img
            src="https://geti.id/wp-content/uploads/2023/08/1684731929210-1.png"
            alt="TradeHub Marketplace"
            className="w-3/4 lg:w-full"
          />
        </div>
      </div>

      {/* Creators Section */}
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Meet the Creators
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Creator 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQF7Aj153oSCsg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729711603623?e=1739404800&v=beta&t=wHWQHdyCG8mHggwsRBoWg7rL26TOOn4Ynh4tt9lGOWY"
              alt="Creator 1"
              className="rounded-full w-24 mx-auto mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 text-center">Jenish Kothari</h3>
            <p className="text-gray-600 text-center mt-2">
              Co-founder 
            </p>
          </div>
          {/* Creator 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
            <img
              src="https://avatars.githubusercontent.com/u/49620784?v=4"
              alt="Creator 2"
              className="rounded-full w-24 mx-auto mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 text-center">Vidith Agarwal</h3>
            <p className="text-gray-600 text-center mt-2">
              Co-founder 
            </p>
          </div>
          {/* Creator 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocJFoY3abSLmJ-AMXqHzxT3Vd4O4TIm-4AwSlpCkCXxUEQIRIsw=s576-c-no"
              alt="Creator 3"
              className="rounded-full w-24 mx-auto mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 text-center">Sachi Chaudhary</h3>
            <p className="text-gray-600 text-center mt-2">
              Co-founder 
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 rounded-lg shadow-lg">
        <p className="text-center text-lg font-medium">
          Join <span className="font-bold">TradeHub</span> today and discover the world of endless opportunities!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
