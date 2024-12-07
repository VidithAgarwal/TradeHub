const SellerHome = () => {
    const itemsForSale = [
        {
          id: 1,
          name: "Bike",
          listingPrice: "$100",
          soldPrice: "$80",
          sold: true,
          buyer: {
            name: "John Doe",
            profileLink: "https://example.com/john-doe",
          },
        },
        {
          id: 2,
          name: "Table",
          listingPrice: "$50",
          soldPrice: "$30",
          sold: true,
          buyer: {
            name: "Jane Smith",
            profileLink: "https://example.com/jane-smith",
          },
        },
        {
          id: 3,
          name: "Laptop",
          listingPrice: "$500",
          soldPrice: null,
          sold: false,
          buyer: null,
        },
        {
          id: 4,
          name: "Chair",
          listingPrice: "$20",
          soldPrice: "$15",
          sold: true,
          buyer: {
            name: "Alice Johnson",
            profileLink: "https://example.com/alice-johnson",
          },
        },
        {
          id: 5,
          name: "Headphones",
          listingPrice: "$75",
          soldPrice: null,
          sold: false,
          buyer: null,
        },
        {
          id: 6,
          name: "Smartphone",
          listingPrice: "$300",
          soldPrice: "$270",
          sold: true,
          buyer: {
            name: "Bob Williams",
            profileLink: "https://example.com/bob-williams",
          },
        },
        {
          id: 7,
          name: "Bookshelf",
          listingPrice: "$120",
          soldPrice: "$100",
          sold: true,
          buyer: {
            name: "Emma Brown",
            profileLink: "https://example.com/emma-brown",
          },
        },
        {
          id: 8,
          name: "Gaming Console",
          listingPrice: "$400",
          soldPrice: null,
          sold: false,
          buyer: null,
        },
      ];
      

  return (
    <div className="container mx-auto">
  <header className="text-3xl font-bold text-gray-800 text-center mt-10">
    Items Listed for Sale
  </header>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 mt-10">
    {itemsForSale.map((item) => {
      return (
        <div
          key={item.id}
          className={`relative p-6 border rounded-xl shadow-lg transform transition-all hover:scale-105 ${
            item.sold ? "bg-gray-200" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-bold mb-2 text-gray-800">{item.name}</h2>
          <p className="text-gray-600 text-sm mb-2">
            Listing Price: {item.listingPrice}
          </p>
          {item.sold && (
            <p className="text-gray-600 text-sm mb-2">
              Sold Price: {item.soldPrice}
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
              Buyer:{" "}
              <a
                href={item?.buyer?.profileLink}
                target="_blank"
                rel="noopener noreferrer"
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
        </div>
      );
    })}
  </div>
</div>
  );
};

export default SellerHome;
